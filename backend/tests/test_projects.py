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
