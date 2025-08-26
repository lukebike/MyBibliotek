import api from "../../api";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateAuthor } from "../../types/authors/CreateAuthor";
import { useState } from "react";

export default function PostUsers() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAuthor>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const onSubmit: SubmitHandler<CreateAuthor> = async (data) => {
    try {
      console.log(data);
      const response = await api.post("/api/authors", data);
      setSnackbarMsg(`Author ${response.data.firstName} created successfully!`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMsg("Failed to create author.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      if (typeof error === "object" && error !== null && "response" in error) {
        // @ts-expect-error - Axios error type is unknown
        console.error("Failed to create author:", error.response.data.errors);
      } else {
        console.error("Failed to create author:", error);
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 5 }}>
        Create a New Author
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
          label="Nationality"
          variant="outlined"
          {...register("nationality", {
            required: "Nationality is required",
            minLength: {
              value: 3,
              message: "Nationality must be longer than 2 characters",
            },
          })}
          slotProps={{ input: { autoComplete: "country" } }}
          error={!!errors.nationality}
          helperText={errors.nationality?.message}
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
