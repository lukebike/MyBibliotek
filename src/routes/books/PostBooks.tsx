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
import type { CreateBook } from "../../types/Book/CreateBook";
import { useEffect, useState } from "react";
import { useAuthorStore } from "../../store/authorStore";

export default function PostBooks() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateBook>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const authors = useAuthorStore((state) => state.authors);
  const fetchAuthors = useAuthorStore((state) => state.fetchAuthors);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const onSubmit: SubmitHandler<CreateBook> = async (data) => {
    try {
      const response = await api.post("/books", data);
      setSnackbarMsg(`Book ${response.data.title} created successfully!`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      reset();
    } catch (error) {
      setSnackbarMsg("Failed to create book.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      if (typeof error === "object" && error !== null && "response" in error) {
        // @ts-expect-error - error may have a 'response' property from Axios, but TypeScript does not know its type
        console.error("Failed to create book:", error.response.data.errors);
      } else {
        console.error("Failed to create book:", error);
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 5 }}>
        Create a New Book
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
          label="Title"
          variant="outlined"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 5,
              message: "Title should contain at least 5 characters",
            },
          })}
          slotProps={{ input: { autoComplete: "off" } }}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="Publication Year"
          type="number"
          variant="outlined"
          {...register("publicationYear", {
            required: "Publication year is required",
            min: {
              value: 1000,
              message: "Publication year must be greater than or equal to 1000",
            },
          })}
          slotProps={{
            input: { autoComplete: "off" },
            htmlInput: { min: 1000 },
          }}
          error={!!errors.publicationYear}
          helperText={errors.publicationYear?.message}
        />
        <TextField
          label="Available Copies"
          type="number"
          variant="outlined"
          {...register("availableCopies", {
            required: "Available copies value is required",
            min: {
              value: 1,
              message: "Available copies must be greater than or equal to 1",
            },
          })}
          slotProps={{ input: { autoComplete: "off" }, htmlInput: { min: 1 } }}
          error={!!errors.availableCopies}
          helperText={errors.availableCopies?.message}
        />
        <TextField
          label="Total Copies"
          type="number"
          {...register("totalCopies", {
            required: "Total copies value is required",
            min: {
              value: 1,
              message: "Total copies must be greater than or equal to 1",
            },
          })}
          slotProps={{ input: { autoComplete: "off" }, htmlInput: { min: 1 } }}
          error={!!errors.totalCopies}
          helperText={errors.totalCopies?.message}
        />
        <TextField
          label="Author ID"
          type="number"
          {...register("authorId", {
            required: "Author ID is required",
            min: {
              value: 1,
              message: "Author ID must be greater than or equal to 1",
            },
            validate: (value) =>
              authors.some((author) => author.id === Number(value)) ||
              "Author does not exist",
          })}
          slotProps={{ input: { autoComplete: "off" }, htmlInput: { min: 1 } }}
          error={!!errors.authorId}
          helperText={errors.authorId?.message}
        />
        <Button
          type="submit"
          variant="contained"
          aria-label="Submit new book"
          disabled={isSubmitting}
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
