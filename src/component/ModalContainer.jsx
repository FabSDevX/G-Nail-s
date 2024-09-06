import { Modal, Box } from "@mui/material";
import PropTypes from "prop-types";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "78vw",
  height: "68vh",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function ModalContainer({ open, handleClose, children, disableBackdropClose = false, additionalStyles }) {
  return (
    <Modal
      open={open}
      onClose={disableBackdropClose ? () => {} : handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{...modalStyle, ...additionalStyles}}>{children}</Box>
    </Modal>
  );
}

ModalContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  disableBackdropClose: PropTypes.bool,
  additionalStyles: PropTypes.object
};

export default ModalContainer;
