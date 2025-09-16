import api from "../../api";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNotification } from "../../hooks/useNotification";
import { useNavigate } from "react-router";
import type { SignUpRequest } from "../../types/miscellaneous/SignupRequest";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpRequest>();

  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpRequest> = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      showSuccess(`User ${response.data.firstName} created successfully!`);
      console.log(response);
      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (error) {
      if (typeof error === "object" && error !== null && "response" in error) {
        // @ts-expect-error - Axios error type is unknown
        if(error.response.status === 400) {
          showError("Email already in use.");
        }
        else {
                  // @ts-expect-error - Axios error type is unknown

        showError("Failed to create user:", error.response.data.errors);
        }
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 5 }}>
        Register
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
          label="First Name"
          variant="outlined"
          {...register("firstName", {
            required: "First name is required",
            minLength: {
              value: 3,
              message: "First name must be longer than 2 characters",
            },
          })}
          slotProps={{ input: { autoComplete: "given-name" } }}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          {...register("lastName", {
            required: "Last name is required",
            minLength: {
              value: 3,
              message: "Last name must be longer than 2 characters",
            },
          })}
          slotProps={{ input: { autoComplete: "family-name" } }}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <TextField
          label="Username"
          type="email"
          variant="outlined"
          {...register("username", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Entered value does not match email format",
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
backgroundColor: "primary",          
          }}
        >
          Submit Form!
        </Button>
      </Box>
    </Paper>
  );
}
