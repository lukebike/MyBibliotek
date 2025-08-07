import api from "../../api";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateUser } from "../../types/users/CreateUser";
import { useNotification } from "../../hooks/useNotification";
import { useNavigate } from "react-router";

export default function PostUsers() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>();

  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateUser> = async (data) => {
    try {
      const response = await api.post("/users", data);
      showSuccess(`User ${response.data.firstName} created successfully!`);
      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (error) {
      showError("Failed to create user.");
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
        Create a New User
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
          label="Email"
          type="email"
          variant="outlined"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Entered value does not match email format",
            },
          })}
          slotProps={{ input: { autoComplete: "email" } }}
          error={!!errors.email}
          helperText={errors.email?.message}
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
