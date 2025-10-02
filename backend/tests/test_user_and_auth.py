from fastapi import status


def test_register_user_success(client):
    payload = {
        "username": "bob",
        "email": "bob@example.com",
        "password": "supersecret",
    }
    resp = client.post("/api/users/register", json=payload)
    assert resp.status_code == status.HTTP_200_OK
    data = resp.json()
    assert data["username"] == payload["username"]
    assert data["email"] == payload["email"]
    assert "id" in data


def test_register_user_duplicate_email_and_username(client):
    payload = {
        "username": "carol",
        "email": "carol@example.com",
        "password": "supersecret",
    }
    # First registration
    assert client.post("/api/users/register", json=payload).status_code == 200
    # Duplicate email
    dup_email = {**payload, "username": "carol2"}
    r1 = client.post("/api/users/register", json=dup_email)
    assert r1.status_code == 400
    assert r1.json()["detail"] == "Email already registered"
    # Duplicate username
    dup_username = {**payload, "email": "carol2@example.com"}
    r2 = client.post("/api/users/register", json=dup_username)
    assert r2.status_code == 400
    assert r2.json()["detail"] == "Username already taken"


def test_login_success(client, test_user):
    # OAuth2PasswordRequestForm expects form data
    resp = client.post(
        "/api/auth/login",
        data={"username": test_user.username, "password": "secretpassword"},
        headers={"content-type": "application/x-www-form-urlencoded"},
    )
    assert resp.status_code == status.HTTP_200_OK
    token = resp.json()
    assert token["token_type"] == "bearer"
    assert isinstance(token["access_token"], str) and token["access_token"]


def test_login_invalid_credentials(client, test_user):
    resp = client.post(
        "/api/auth/login",
        data={"username": test_user.username, "password": "wrong"},
        headers={"content-type": "application/x-www-form-urlencoded"},
    )
    assert resp.status_code == status.HTTP_401_UNAUTHORIZED
    assert resp.json()["detail"] == "Invalid credentials"

