import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
import { useLogin } from "../features/auth/hooks/useLogin";
import { useAuth } from "../features/auth/hooks/useAuth";
import { glassPanel } from "../shared/styles/glassPanel";
import HeroBanner from "../shared/components/HeroBanner";
import { pageShellSx } from "../shared/styles/layout";
import { colors } from "../shared/styles/colors";

const demoCredentials = {
  username: "testuser",
  password: "testpassword",
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loginMutation = useLogin();
  const { login: loginContext } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      const data = await loginMutation.mutateAsync({ username, password });
      loginContext(data.access_token);
      navigate(next, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMsg("Login failed. Please try again.");
    }
  };

  return (
    <Box sx={pageShellSx}>
      <HeroBanner containerProps={{ maxWidth: "sm" }}>
        <Stack spacing={2.5}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Welcome back
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.tertiary }}>
            Sign in to access your projects, collaborate with the team, and keep
            work moving forward without missing a beat.
          </Typography>
        </Stack>
      </HeroBanner>

      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={(theme) => ({
            ...glassPanel(theme),
            width: "100%",
          })}
        >
          <Stack spacing={3}>
            <Box
              sx={(theme) => ({
                p: 2.5,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.secondary.main, 0.12),
                border: `1px solid ${alpha(
                  theme.palette.secondary.main,
                  0.38
                )}`,
              })}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={(theme) => ({
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                })}
              >
                Demo account
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.tertiary }}>
                Username: {demoCredentials.username}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.tertiary }}>
                Password: {demoCredentials.password}
              </Typography>
            </Box>

            {errorMsg && (
              <Typography color="error" sx={{ textAlign: "center" }}>
                {errorMsg}
              </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  label="Username"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </Stack>
            </Box>

            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
            >
              Don't have an account?{" "}
              <MuiLink component={RouterLink} to="/register">
                Register here
              </MuiLink>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
