import api from "../../api";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useEffect } from "react";

import type { CreateLoan } from "../../types/loans/CreateLoan";
import { useUserStore } from "../../store/userStore";
import { useBookStore } from "../../store/bookStore";
import { useNotification } from "../../hooks/useNotification";
import { useNavigate } from "react-router";

export default function PostBooks() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateLoan>();

  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  const books = useBookStore((state) => state.books);
  const fetchBooks = useBookStore((state) => state.fetchBooks);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const onSubmit: SubmitHandler<CreateLoan> = async (data) => {
    try {
      const response = await api.post("/api/loans", data);
      const newBookLoan = books.find((book) => book.id === Number(data.bookId));

      if (newBookLoan?.availableCopies == 0) {
        showError("Book has no available copies, please wait for new stock");
      } else {
        showSuccess(
          `Loan for ${response.data.book.title} created successfully!`
        );
        setTimeout(() => navigate("/loans"), 1500);
        reset();
      }
    } catch (error) {
      showError("Failed to create loan.");
      if (typeof error === "object" && error !== null && "response" in error) {
        // @ts-expect-error - Axios error type is unknown
        console.error("Failed to create loan:", error.response.data.errors);
      } else {
        console.error("Failed to create loan:", error);
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 5 }}>
        Create a New Loan
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
          label="Book ID"
          type="number"
          {...register("bookId", {
            required: "Book ID is required",
            min: {
              value: 1,
              message: "Book ID must be greater than or equal to 1",
            },
            validate: (value) =>
              books.some((book) => book.id === Number(value)) ||
              "Book does not exist",
          })}
          slotProps={{ input: { autoComplete: "off" }, htmlInput: { min: 1 } }}
          error={!!errors.bookId}
          helperText={errors.bookId?.message}
        />
        <TextField
          label="User ID"
          type="number"
          {...register("userId", {
            required: "User ID is required",
            min: {
              value: 1,
              message: "User ID must be greater than or equal to 1",
            },
            validate: (value) =>
              users.some((user) => user.id === Number(value)) ||
              "User does not exist",
          })}
          slotProps={{ input: { autoComplete: "off" }, htmlInput: { min: 1 } }}
          error={!!errors.userId}
          helperText={errors.userId?.message}
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
    </Paper>
  );
}
