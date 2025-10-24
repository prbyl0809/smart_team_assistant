import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { colors } from "../styles/colors";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="transparent"
      sx={[
        {
          color: (theme) => theme.palette.text.primary,
          transition:
            "background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        },
        isScrolled
          ? {
              backgroundColor: "rgba(12, 16, 22, 0.6)",
              borderBottom: `1px solid ${colors.border.subtle}`,
              backdropFilter: "blur(8px)",
            }
          : {
              backgroundColor: colors.base.background,
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              backdropFilter: "none",
            },
      ]}
    >
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
            src="/logo-icon-blue-gradient.svg"
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
              <Button
                component={RouterLink}
                to="/login"
                color="inherit"
                variant="text"
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="outlined"
                color="secondary"
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
