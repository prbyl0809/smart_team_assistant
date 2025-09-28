from fastapi import status


def _create_project(auth_client):
    r = auth_client.post("/projects/", json={"name": "TasksProj", "description": "TD"})
    assert r.status_code == status.HTTP_201_CREATED
    return r.json()["id"]


def test_task_lifecycle(auth_client):
    project_id = _create_project(auth_client)

    # Create task
    task_payload = {
        "title": "T1",
        "description": "Do something",
        "status": "todo",
        "priority": "medium",
        "due_date": None,
        "assignee_id": None,
    }
    r = auth_client.post(f"/project/{project_id}/tasks/", json=task_payload)
    assert r.status_code == status.HTTP_201_CREATED
    created = r.json()
    assert created["title"] == "T1"

    # List
    r2 = auth_client.get(f"/project/{project_id}/tasks/")
    assert r2.status_code == status.HTTP_200_OK
    items = r2.json()
    assert len(items) == 1
    task_id = items[0]["id"]

    # Get by id
    r3 = auth_client.get(f"/project/{project_id}/tasks/{task_id}")
    assert r3.status_code == status.HTTP_200_OK
    assert r3.json()["id"] == task_id

    # Update
    r4 = auth_client.put(
        f"/project/{project_id}/tasks/{task_id}",
        json={"title": "T1-upd", "description": "Updated"},
    )
    assert r4.status_code == status.HTTP_200_OK
    assert r4.json()["title"] == "T1-upd"

    # Partial update
    r5 = auth_client.patch(
        f"/project/{project_id}/tasks/{task_id}",
        json={"status": "in_progress"},
    )
    assert r5.status_code == status.HTTP_200_OK
    assert r5.json()["status"] == "in_progress"

    # Delete
    r6 = auth_client.delete(f"/project/{project_id}/tasks/{task_id}")
    assert r6.status_code == status.HTTP_204_NO_CONTENT

    # After delete, list should be empty
    r7 = auth_client.get(f"/project/{project_id}/tasks/")
    assert r7.status_code == status.HTTP_200_OK
    assert r7.json() == []

