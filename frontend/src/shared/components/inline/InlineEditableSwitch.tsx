import { useState } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";

export type InlineEditableSwitchProps = {
  value: boolean;
  onSave: (value: boolean) => Promise<void> | void;
  label: string;
  description?: string;
  disabled?: boolean;
};

export default function InlineEditableSwitch({
  value,
  onSave,
  label,
  description,
  disabled = false,
}: InlineEditableSwitchProps) {
  const [toggling, setToggling] = useState(false);

  const handleChange = async (_event: unknown, checked: boolean) => {
    if (disabled || checked === value) return;
    setToggling(true);
    try {
      await onSave(checked);
    } catch (err) {
      console.error(err);
    } finally {
      setToggling(false);
    }
  };

  return (
    <Tooltip title={disabled ? "Editing disabled" : undefined} placement="top">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <Switch
          checked={value}
          onChange={handleChange}
          disabled={disabled || toggling}
        />
        <Stack spacing={0.25}>
          <Typography fontWeight={600}>{label}</Typography>
          {description ? (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          ) : null}
        </Stack>
        {toggling ? <CircularProgress size={18} /> : null}
      </Box>
    </Tooltip>
  );
}
