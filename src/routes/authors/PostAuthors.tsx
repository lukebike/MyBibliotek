import api from "../../api";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateAuthor } from "../../types/Author/CreateAuthor";

export default function PostUsers() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAuthor>();

  const onSubmit: SubmitHandler<CreateAuthor> = async (data) => {
    try {
      const response = await api.post("/authors", data);
      console.log(response);
      window.alert(`Author ${response.data.firstName} created successfully!`);
    } catch (error) {
      if (typeof error === "object" && error !== null && "response" in error) {
        // @ts-expect-error - error may have a 'response' property from Axios, but TypeScript does not know its type
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
          {...register("lastName", {
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
    </Paper>
  );
}
