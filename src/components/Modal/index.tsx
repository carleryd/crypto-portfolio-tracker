import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2 as Grid,
} from "@mui/material";

import { useModalStore } from "@/stores/useModalStore";

const Modal = () => {
  const { isOpen, title, content, close } = useModalStore();

  return (
    <Dialog open={isOpen} onClose={close} maxWidth="sm">
      <Grid container direction="column" alignItems="center" padding={3}>
        {title ? <DialogTitle variant="h4">{title}</DialogTitle> : null}
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={close}>
            Close
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default Modal;
