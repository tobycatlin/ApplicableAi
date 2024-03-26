import { Avatar, Box, Button, Container, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import WarningIcon from "@mui/icons-material/WarningOutlined";
import { Modal, Backdrop } from "@components/modals/modal-global";
import { ReactNode } from "react";

interface Props {
  title: string;
  description: ReactNode;
  confirmButtonText?: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalConfirm({
  title,
  description,
  confirmButtonText = "Yes",
  open,
  onClose,
  onConfirm
}: Props) {

  const BoxStyle1 = {
    display: "flex",
    flexDirection: "column",
    margin: 3,
    mx: "auto",
    p: 3,
  };

  const BoxStyle2 = {
    display: "flex",
    pb: 2,
    pt: 3,
    px: 3,
  };

  const BoxStyle3 = {
    display: "flex",
    justifyContent: "flex-end",
    px: 3,
    py: 1.5,
  };

  const ButtonStyle = {
    backgroundColor: "error.main",
    "&:hover": {
      backgroundColor: "error.dark",
    },
  };


  return (
    <Modal open={open} onClose={onClose} slots={{ backdrop: Backdrop }}>
      <Box sx={BoxStyle1}>
        <Container maxWidth="sm">
          <Paper elevation={12}>
            <Box sx={BoxStyle2}>
              <Avatar sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.error.main, 0.08),
                color: "error.main",
                mr: 2,
              }}>
                <WarningIcon fontSize="small" />
              </Avatar>
              <div>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  {description}
                </Typography>
              </div>
            </Box>
            <Box sx={BoxStyle3}>
              <Button sx={{ mr: 2 }} variant="text" onClick={onClose}>
                Cancel
              </Button>
              <Button sx={ButtonStyle} variant="contained" onClick={onConfirm}>
                {confirmButtonText}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Modal>
  );
}
