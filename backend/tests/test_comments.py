from fastapi import status

from app.models.user import User


def _create_project(auth_client):
    response = auth_client.post(
        "/api/projects/",
        json={"name": "Comment Project", "description": "With comments"},
    )
    assert response.status_code == status.HTTP_201_CREATED
    return response.json()["id"]


def test_create_and_list_comments(auth_client):
    project_id = _create_project(auth_client)

    create_resp = auth_client.post(
        f"/api/projects/{project_id}/comments/",
        json={"body": "Initial update"},
    )
    assert create_resp.status_code == status.HTTP_201_CREATED
    created = create_resp.json()
    assert created["body"] == "Initial update"
    assert created["author"]["username"] == "alice"
    assert created["edited"] is False

    list_resp = auth_client.get(f"/api/projects/{project_id}/comments/")
    assert list_resp.status_code == status.HTTP_200_OK
    items = list_resp.json()
    assert len(items) == 1
    assert items[0]["body"] == "Initial update"


def test_author_can_edit_and_delete_comment(auth_client):
    project_id = _create_project(auth_client)

    create_resp = auth_client.post(
        f"/api/projects/{project_id}/comments/",
        json={"body": "Working on it"},
    )
    comment_id = create_resp.json()["id"]

    update_resp = auth_client.patch(
        f"/api/projects/{project_id}/comments/{comment_id}",
        json={"body": "Updated progress"},
    )
    assert update_resp.status_code == status.HTTP_200_OK
    updated = update_resp.json()
    assert updated["body"] == "Updated progress"
    assert updated["edited"] is True

    delete_resp = auth_client.delete(
        f"/api/projects/{project_id}/comments/{comment_id}"
    )
    assert delete_resp.status_code == status.HTTP_204_NO_CONTENT

    list_resp = auth_client.get(f"/api/projects/{project_id}/comments/")
    assert list_resp.status_code == status.HTTP_200_OK
    assert list_resp.json() == []


def test_other_user_cannot_modify_comment(auth_client, db_session, test_user):
    project_id = _create_project(auth_client)
    create_resp = auth_client.post(
        f"/api/projects/{project_id}/comments/",
        json={"body": "Owner comment"},
    )
    comment_id = create_resp.json()["id"]

    other = User(
        username="bob",
        email="bob@example.com",
        hashed_password="hashed",
        is_active=True,
    )
    db_session.add(other)
    db_session.commit()
    db_session.refresh(other)

    task_resp = auth_client.post(
        f"/api/project/{project_id}/tasks/",
        json={
            "title": "Help task",
            "description": "Assist",
            "assignee_id": other.id,
        },
    )
    assert task_resp.status_code == status.HTTP_201_CREATED

    import main
    from app.dependencies.auth import get_current_user as _get_current_user

    def override_other_user():
        return other

    main.app.dependency_overrides[_get_current_user] = override_other_user
    try:
        patch_resp = auth_client.patch(
            f"/api/projects/{project_id}/comments/{comment_id}",
            json={"body": "Hacked"},
        )
        assert patch_resp.status_code == status.HTTP_403_FORBIDDEN

        delete_resp = auth_client.delete(
            f"/api/projects/{project_id}/comments/{comment_id}"
        )
        assert delete_resp.status_code == status.HTTP_403_FORBIDDEN
    finally:
        main.app.dependency_overrides.pop(_get_current_user, None)
