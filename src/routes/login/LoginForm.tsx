import api from "../../api";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNotification } from "../../hooks/useNotification";
import { useNavigate } from "react-router";
import type { LoginInfo } from "../../types/miscellaneous/LoginInfo";

export default function PostUsers() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>();

  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginInfo> = async (data) => {
    try {
      const response = await api.post("/login", data);
      showSuccess(
        `Logged in successfully, welcome back ${response.data.firstName}!`
      );
      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (error) {
      showError(`Failed to login.`);
      if (typeof error === "object" && error !== null && "response" in error) {
        // @ts-expect-error - error may have a 'response' property from Axios, but TypeScript does not know its type
        console.error("Failed to create user:", error.response.data.errors);
      } else {
        console.error("Failed to create user:", error);
      }
    }
  };

  return (
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
            minLength: {
              value: 3,
              message: "Username must be longer than 2 characters",
            },
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
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
              message:
                "Password must contain uppercase, lowercase, number, and special character",
            },
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
          Submit Form!
        </Button>
      </Box>
    </Paper>
  );
}
