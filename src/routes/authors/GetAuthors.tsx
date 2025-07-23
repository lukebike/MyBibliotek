import { useEffect, useState } from "react";
import api from "../../api";
import type { Author } from "../../types/Author/Author";
import { Box } from "@mui/material";

export default function GetAuthors() {
  const [authors, setAuthors] = useState<Author[]>();
  useEffect(() => {
    api.get("/authors").then((response) => {
      setAuthors(response.data);
    });
  }, []);

  return (
    <Box>
      {authors &&
        authors.map((author) => <p key={author.id}>{author.firstName}</p>)}
    </Box>
  );
}
