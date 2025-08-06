import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../api";
import { useNavigate, useParams } from "react-router";
import { useUserStore } from "../../store/userStore";
import type { UpdateUser } from "../../types/users/UpdateUser";
import { useEffect } from "react";
import { useNotification } from "../../hooks/useNotification";

export default function UpdateUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const users = useUserStore((state) => state.users);
  const updateUser = useUserStore((state) => state.updateUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUser>();

  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    const user = users.find((u) => String(u.id) === String(id));
    if (user) {
      reset(user);
    } else if (id) {
      api
        .get<UpdateUser>(`/users/${id}`)
        .then((response) => {
          reset(response.data);
        })
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, [id, users, reset]);

  const onSubmit: SubmitHandler<UpdateUser> = async (data) => {
    try {
      const response = await api.put(`/users/${id}`, data);
      updateUser(response.data);
      showSuccess(`User updated successfully!`);
      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (error) {
      showError(`Failed to update user: ${error}`);
      console.error("Failed to update user:", error);
    }
  };
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 5 }}>
        Update User
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
          label="Current Password"
          type="password"
          {...register("currentPassword", {
            required: "Current password is required",
          })}
          slotProps={{ input: { autoComplete: "current-password" } }}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
        />
        <TextField
          label="New Password (optional)"
          type="password"
          {...register("newPassword", {
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
          slotProps={{ input: { autoComplete: "new-password" } }}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
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
          Update User!
        </Button>
      </Box>
    </Paper>
  );
}
