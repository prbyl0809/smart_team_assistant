import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: { xs: 70, md: 80 },
          gap: 3,
          py: 1.25,
          px: { xs: 2.5, md: 5, lg: 7 },
        }}
      >
        <Box display="flex" alignItems="center" gap={3}>
          <Box
            component="img"
            src="/logo-icon-gradient.svg"
            alt="Project Manager Logo"
            height={40}
          />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 0,
              textDecoration: "none",
              color: (theme) => theme.palette.text.primary,
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            Smart Team Assistant
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          sx={{
            "& .MuiButton-root": {
              fontSize: "0.95rem",
            },
          }}
        >
          {isAuthenticated ? (
            <>
              <Button component={RouterLink} to="/" color="inherit">
                Dashboard
              </Button>
              <Button component={RouterLink} to="/projects" color="inherit">
                Projects
              </Button>
              <Button onClick={handleLogout} variant="outlined" color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="inherit">
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
              >
                Get Started
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
