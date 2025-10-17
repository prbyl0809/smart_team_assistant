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
      <Toolbar sx={(theme) => theme.mixins.toolbar} />
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
          py: 3,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      ></Box>
    </Box>
  );
}
