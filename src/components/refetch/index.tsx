import React from "react";
import { Button, Box } from "@mui/material";

interface RefetchProps {
  refetch: () => void;
  clear?: () => void;
}

const Refetch: React.FC<RefetchProps> = ({ refetch, clear }) => {
  return (
    <Box>
      <Button
        variant="outlined"
        color="success"
        onClick={refetch}
        sx={{
          display: "block",
          margin: "1rem auto",
          fontSize: "1.5rem",
          padding: "20px 60px",
        }}
      >
        Request Data from Server
      </Button>
      //? single product page doesn't have clear button (since it has inital data, which does not need to get cleared)
      {clear && (
        <Button
          variant="outlined"
          color="error"
          onClick={clear}
          sx={{
            display: "block",
            margin: "2.5rem auto",
            fontSize: "1.5rem",
            padding: "20px 60px",
          }}
        >
          Clear Data from Cache
        </Button>
      )}
    </Box>
  );
};

export default Refetch;
