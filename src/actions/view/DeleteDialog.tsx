import {
  Dialog,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface IProps {
  onDelete?: Function;
  onClose?: Function;
  itemName?: string;
  isLoading?: boolean;
}

export default function DeleteDialog(props: IProps) {
  const { onDelete, onClose, itemName = "", isLoading } = props;

  const handleClose = () => {
    onClose?.();
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 5,
          px: 3,
          py: 2,
          minWidth: 320,

          // 🔥 glass effect
          background: "rgba(30,30,30,0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",

          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          color: "white",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(6px)",
        },
      }}
    >
      {/* ❌ close */}
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={handleClose} size="small" sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* 🗑 icon + title */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1.5}
        pb={2}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(255, 59, 48, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DeleteOutlineIcon sx={{ fontSize: 36, color: "#ff453a" }} />
        </Box>

        <Typography fontWeight={600} fontSize={18} textAlign="center">
          {`Удалить запись ${itemName ? '"' + itemName + '"' : ""}`.trim() +
            "?"}
        </Typography>
      </Box>

      {/* 🔥 buttons */}
      <Stack spacing={1}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleDelete}
          loading={isLoading}
          sx={{
            borderRadius: 3,
            py: 1.2,
            fontWeight: 600,
            textTransform: "none",
            backgroundColor: "#ff453a",
            "&:hover": {
              backgroundColor: "#ff2d1a",
            },
          }}
        >
          Удалить
        </Button>

        <Button
          fullWidth
          disabled={isLoading}
          onClick={handleClose}
          sx={{
            borderRadius: 3,
            py: 1.2,
            textTransform: "none",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          Отмена
        </Button>
      </Stack>
    </Dialog>
  );
}
