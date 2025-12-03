import { Box, Chip, Stack, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ReportIcon from "@mui/icons-material/Report";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { alpha } from "@mui/material/styles";
import HeroBanner from "../../shared/components/HeroBanner";
import { colors } from "../../shared/styles/colors";
import DashboardStat from "./DashboardStat";
import { ProjectStats } from "../utils/projectStats";

type DashboardHeroProps = {
  stats: ProjectStats;
};

export function DashboardHero({ stats }: DashboardHeroProps) {
  return (
    <HeroBanner
      containerProps={{ maxWidth: "xl" }}
      sx={{ backgroundImage: "none" }}
    >
      <Stack spacing={2.5} sx={{ position: "relative", zIndex: 1 }}>
        <Chip
          icon={<AutoAwesomeIcon fontSize="small" />}
          label="Realtime drag & drop board"
          sx={{
            alignSelf: "flex-start",
            bgcolor: alpha(colors.text.secondary, 0.1),
            color: colors.text.secondary,
            border: `1px solid ${alpha(colors.border.default, 0.8)}`,
            borderRadius: 99,
            px: 1,
          }}
        />
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800 }} gutterBottom>
            Stay on top of every project
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: colors.text.tertiary,
              maxWidth: 720,
              fontSize: "1rem",
            }}
          >
            Manage all your projects in one place with our intuitive dashboard.
            Quickly filter, search, and sort to find what you need and keep your
            team aligned.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <DashboardStat
            icon={<PendingActionsIcon />}
            label="Active"
            value={stats.active}
            tone="neutral"
          />
          <DashboardStat
            icon={<ReportIcon />}
            label="Blocked items"
            value={stats.blocked}
            tone="neutral"
          />
          <DashboardStat
            icon={<AccessTimeIcon />}
            label="Due within 7 days"
            value={stats.dueSoon}
            tone="neutral"
          />
          <DashboardStat
            icon={<EventBusyIcon />}
            label="Overdue"
            value={stats.overdue}
            tone="danger"
          />
        </Stack>
      </Stack>
    </HeroBanner>
  );
}
