import React, { useState } from "react";
import api from "../api";
import { Box, TextField, Button } from "@mui/material";

export default function PostUsers() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const request = await api.post("/users", form);
    console.log(request);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", m: 3 }}
    >
      <TextField
        label="First Name"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <Button type="submit">Submit Form!</Button>
    </Box>
  );
}
