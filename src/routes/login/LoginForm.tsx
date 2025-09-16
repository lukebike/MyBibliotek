import api from "../../api";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNotification } from "../../hooks/useNotification";
import { useNavigate } from "react-router";
import type { LoginInfo } from "../../types/miscellaneous/LoginInfo";
import { useUserStore } from "../../store/userStore";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>();

  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  const loggedIn = useUserStore((state) => state.loggedIn);
  const setLoggedIn = useUserStore((state) => state.setLoggedIn);

  const onSubmit: SubmitHandler<LoginInfo> = async (data) => {
    try {
      const response = await api.post("/auth/login", data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      console.log(data);
      if (response.status === 200) {
        localStorage.setItem("jwt", response.data.token);
        console.log(response);
        showSuccess(`Logged in successfully, welcome back ${response.data.username}!`);
        setLoggedIn(true);
      }

      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (error) {
      showError(`Failed to login.`);
      if (typeof error === "object" && error !== null && "response" in error) {
        // @ts-expect-error - Axios error type is unknown
        console.error("Failed to login:", error.response.data.errors);
      } else {
        console.error("Failed to login:", error);
      }
    }
  };

  return loggedIn ? (
    <Paper>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 5 }}>
        You are logged in, welcome back
      </Typography>
    </Paper>
  ) : (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 5 }}>
        Log In
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Username"
          type="email"
          variant="outlined"
          {...register("username", {
            required: "Username is required",
          })}
          slotProps={{ input: { autoComplete: "email" } }}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          slotProps={{ input: { autoComplete: "current-password" } }}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#19bfcf",
            "&:hover": {
              backgroundColor: "#14959c",
            },
          }}
        >
          Log In!
        </Button>
      </Box>
    </Paper>
  );
}
