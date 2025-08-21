/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../api";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import type { UpdateBook } from "../../types/books/UpdateBook";
import { useBookStore } from "../../store/bookStore";
import { useAuthorStore } from "../../store/authorStore";
import { useNotification } from "../../hooks/useNotification";

export default function UpdateBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const books = useBookStore((state) => state.books);
  const updateBook = useBookStore((state) => state.updateBook);
  const authors = useAuthorStore((state) => state.authors);
  const fetchAuthors = useAuthorStore((state) => state.fetchAuthors);
  const { showSuccess, showError } = useNotification();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateBook>();

  useEffect(() => {
    const book = books.find((book) => String(book.id) === String(id));
    if (book) {
      reset(book);
    } else if (id) {
      api
        .get<UpdateBook>(`/api/books/${id}`)
        .then((response) => {
          reset(response.data);
        })
        .catch((err) => {
          console.error("Failed to fetch book:", err);
        });
    }
  }, [id, books, reset]);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const onSubmit: SubmitHandler<UpdateBook> = async (data) => {
    try {
      const response = await api.put(`/books/${id}`, data);
      updateBook(response.data);
      showSuccess("Book updated succesfully!", 3000);
      setTimeout(() => {
        navigate("/books");
      }, 1000);
    } catch (error: any) {
      let errorMessage = "Failed to update book";

      if (error.response?.data) {
        const errorData = error.response.data;

        if (Array.isArray(errorData)) {
          const errorMessages = errorData.map(
            (err) => err.message || String(err)
          );

          if (errorMessages.length === 1) {
            errorMessage = errorMessages[0];
          } else {
            errorMessage = `Please fix the following issues:\n${errorMessages
              .map((msg) => `• ${msg}`)
              .join("\n")}`;
          }
        } else if (typeof errorData === "string") {
          errorMessage = errorData;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      }

      showError(errorMessage);
      console.error("Failed to update book:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 5 }}>
        Update Book
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
          sx={{
            mt: 2,
            backgroundColor: "#19bfcf",
            "&:hover": {
              backgroundColor: "#14959c",
            },
          }}
        >
          Update Book!
        </Button>
      </Box>
    </Paper>
  );
}
