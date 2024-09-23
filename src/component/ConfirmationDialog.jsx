import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const buttonStyle = {
  color: "white",
  fontWeight: "500",
  border: "1px solid black",
  fontSize: {
    xs: "8x",
  },
  "&:hover": {
    background: "var(--primary-color)",
  },
  "&:focus": {
    outline: "none",
  },
};

/**
 * Reutilizable modal for confirmation purpuses
 * @param {function} agreedFuntion Agreed button function triggered
 * @param {React.useState} state Boolean useState to action control
 * @param {string} modalTitle Modal title
 * @returns Modal display on screen
 */
export function ConfirmationDialog(data) {
  const [open, setOpen] = useState(data.state[0]);
  const handleClose = () => data.state[1](false); //It changed on father component

  useEffect(() => {
    setOpen(data.state[0]);
  }, [data]);
  return (
    <Box>
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{
            fontWeight: "600",
            fontSize: {
              xs: "14px",
              sm: "larger",
            },
            padding: {
              xs: "6px 0px 6px 6px",
              sm: "16px 24px;",
            },
          }}
          id="alert-dialog-title"
        >
          {data.modalTitle}
        </DialogTitle>
        <DialogActions
          sx={{
            gap: "20px",
            flexDirection: {
              xs: "column-reverse",
              sm: "row",
            },
          }}
        >
          <Button
            sx={{ ...buttonStyle, background: "var(--delete-color)" }}
            onClick={handleClose}
          >
            Rechazar
          </Button>
          <Button
            sx={{ ...buttonStyle, background: "var(--agreed-color)" }}
            onClick={() => {
              data.agreedFuntion();
              handleClose();
            }}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
