import {
  Box,
  Button,
  Container,
  IconButton,
  Link as MuiLink,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
  const [copyState, setCopyState] = useState<string | null>(null);

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

  const handleCredentialCopy = async (field: string, value: string) => {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
        console.warn("Clipboard API not available in this environment.");
        return;
      }

      await navigator.clipboard.writeText(value);
      setCopyState(field);
      window.setTimeout(() => setCopyState(null), 1600);
    } catch (error) {
      console.error("Unable to copy credentials:", error);
    }
  };

  return (
    <Box sx={pageShellSx}>
      <HeroBanner containerProps={{ maxWidth: "sm" }}>
        <Stack spacing={2.5}>
          <Typography
            variant="h2"
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            Welcome back
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
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
          pt: { xs: 3, md: 3.5 },
          pb: { xs: 5, md: 6 },
        }}
      >
        <Paper
          sx={{
            ...glassPanel(),
            width: "100%",
          }}
        >
          <Stack spacing={3}>
            <Box
              sx={(theme) => ({
                p: 2,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.secondary.main, 0.08),
                border: `1px solid ${alpha(
                  theme.palette.secondary.main,
                  0.22
                )}`,
                display: "flex",
                flexDirection: "column",
                gap: 0.75,
              })}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 0.75 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={(theme) => ({
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  })}
                >
                  Demo account
                </Typography>
                <InfoOutlinedIcon
                  fontSize="small"
                  sx={{ color: colors.text.tertiary }}
                />
              </Stack>
              {[
                { label: "Username", value: demoCredentials.username },
                { label: "Password", value: demoCredentials.password },
              ].map(({ label, value }) => (
                <Stack
                  key={label}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ width: "100%" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      flexShrink: 0,
                      color: colors.text.secondary,
                      minWidth: 76,
                    }}
                  >
                    {label}:
                  </Typography>
                  <Typography
                    variant="body2"
                    component="code"
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontFamily: "ui-monospace, Monaco, Consolas, monospace",
                      fontSize: "0.85rem",
                      color: colors.text.primary,
                      backgroundColor: "rgba(14,18,24,0.7)",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      letterSpacing: "0.02em",
                      minHeight: 32,
                    }}
                  >
                    {value}
                  </Typography>
                  <Tooltip
                    disableFocusListener
                    title={copyState === label ? "Copied!" : "Copy"}
                    placement="top"
                  >
                    <IconButton
                      size="small"
                      aria-label={`Copy ${label.toLowerCase()}`}
                      onClick={() => handleCredentialCopy(label, value)}
                      sx={{
                        color: colors.text.secondary,
                      }}
                    >
                      <ContentCopyIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              ))}
            </Box>

            {errorMsg && (
              <Box
                role="alert"
                sx={{
                  textAlign: "center",
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  border: `1px solid ${alpha(colors.priority.high, 0.4)}`,
                  backgroundColor: alpha(colors.priority.high, 0.12),
                }}
              >
                <Typography variant="body2" sx={{ color: colors.text.primary }}>
                  {errorMsg}
                </Typography>
              </Box>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  label="Username"
                  fullWidth
                  size="medium"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  size="medium"
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
