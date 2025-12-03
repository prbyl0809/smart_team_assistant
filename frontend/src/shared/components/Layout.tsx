import { Box, Toolbar } from "@mui/material";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Navbar />
      <Toolbar
        sx={{
          minHeight: { xs: 70, md: 80 },
          py: 1.25,
        }}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          px: { xs: 2.5, md: 4 },
        }}
      >
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          mt: { xs: 3, md: 4 },
          py: 3,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      ></Box>
    </Box>
  );
}
