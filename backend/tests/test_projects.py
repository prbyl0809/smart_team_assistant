from fastapi import status
from app.models.user import User


def test_create_and_list_projects(auth_client):
    # Create
    payload = {"name": "Proj A", "description": "First"}
    r = auth_client.post("/api/projects/", json=payload)
    assert r.status_code == status.HTTP_201_CREATED
    created = r.json()
    assert created["name"] == "Proj A"
    assert created["description"] == "First"
    assert "id" in created and "owner_id" in created

    # List
    r2 = auth_client.get("/api/projects/")
    assert r2.status_code == status.HTTP_200_OK
    items = r2.json()
    assert len(items) == 1
    assert items[0]["name"] == "Proj A"


def test_update_and_delete_project_authz(auth_client, db_session, test_user):
    # Create a project for test_user
    r = auth_client.post("/api/projects/", json={"name": "P1", "description": "D"})
    pid = r.json()["id"]

    # Create another user (not owner)
    other = User(username="mallory", email="m@example.com", hashed_password="x")
    db_session.add(other)
    db_session.commit()
    db_session.refresh(other)

    # Override current_user to other
    import main
    from app.dependencies.auth import get_current_user as _get_current_user

    def override_other():
        return other

    main.app.dependency_overrides[_get_current_user] = override_other
    try:
        # Update should 404 (not found/unauthorized)
        r2 = auth_client.put(f"/api/projects/{pid}", json={"name": "New"})
        assert r2.status_code == status.HTTP_404_NOT_FOUND

        # Delete should 404 as well
        r3 = auth_client.delete(f"/api/projects/{pid}")
        assert r3.status_code == status.HTTP_404_NOT_FOUND
    finally:
        main.app.dependency_overrides.pop(_get_current_user, None)


def test_projects_list_sorted_by_due_date_and_created(auth_client):
    to_create = [
        {"name": "No Due First", "description": "A"},
        {
            "name": "Due Late",
            "description": "B",
            "due_date": "2024-02-10T00:00:00Z",
        },
        {
            "name": "Due Soon",
            "description": "C",
            "due_date": "2024-01-10T00:00:00Z",
        },
        {"name": "No Due Second", "description": "D"},
    ]

    for payload in to_create:
        resp = auth_client.post("/api/projects/", json=payload)
        assert resp.status_code == status.HTTP_201_CREATED

    listed = auth_client.get("/api/projects/")
    assert listed.status_code == status.HTTP_200_OK

    names = [item["name"] for item in listed.json()]
    assert names == [
        "Due Soon",
        "Due Late",
        "No Due First",
        "No Due Second",
    ]
