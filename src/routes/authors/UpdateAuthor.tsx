import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../api";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useAuthorStore } from "../../store/authorStore";
import type { UpdateAuthor } from "../../types/Author/UpdateAuthor";

export default function UpdateAuthor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const authors = useAuthorStore((state) => state.authors);
  const updateAuthor = useAuthorStore((state) => state.updateAuthor);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateAuthor>();

  useEffect(() => {
    const author = authors.find((author) => String(author.id) === String(id));
    if (author) {
      reset(author);
    } else if (id) {
      api
        .get<UpdateAuthor>(`/authors/${id}`)
        .then((response) => {
          reset(response.data);
        })
        .catch((err) => console.error("Failed to fetch author:", err));
    }
  }, [id, authors, reset]);

  const onSubmit: SubmitHandler<UpdateAuthor> = async (data) => {
    try {
      const response = await api.put(`/author/${id}`, data);
      updateAuthor(response.data);
      window.alert(`Author updated successfully!`);
      navigate("/authors");
    } catch (error) {
      console.error("Failed to update author:", error);
    }
  };
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 5 }}>
        Update Author
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
          Update Author!
        </Button>
      </Box>
    </Paper>
  );
}
