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
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../shared/api/axios";
import { glassPanel } from "../shared/styles/glassPanel";
import HeroBanner from "../shared/components/HeroBanner";
import { pageShellSx } from "../shared/styles/layout";
import { colors } from "../shared/styles/colors";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      await api.post("/users/register", data);
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <Box sx={pageShellSx}>
      <HeroBanner containerProps={{ maxWidth: "sm" }}>
        <Stack spacing={2.5}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Create your account
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.tertiary }}>
            Join the workspace to plan projects, connect with teammates, and
            deliver outcomes faster with shared visibility.
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
            <Typography
              variant="h5"
              sx={(theme) => ({
                fontWeight: 600,
                textAlign: "center",
                color: theme.palette.text.primary,
              })}
            >
              Let's get you set up
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2.5}>
                <TextField
                  label="Username"
                  fullWidth
                  {...register("username", {
                    required: "Username is required",
                  })}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Registering..." : "Register"}
                </Button>
              </Stack>
            </Box>

            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
            >
              Already have an account?{" "}
              <MuiLink component={RouterLink} to="/login">
                Login here
              </MuiLink>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
