import { TextField, Typography } from "@mui/material";
import React from "react";
import "../css/textcomponent.css";
function Textcomponent({ label, disable }) {
  return (
    <div className="textcomponent">
      <Typography>{label}</Typography>
      {disable ? (
        <TextField
          sx={{ width: "30vw" }}
          placeholder={label}
          disabled
        ></TextField>
      ) : (
        <TextField sx={{ width: "30vw" }} placeholder={label}></TextField>
      )}
    </div>
  );
}

export default Textcomponent;
