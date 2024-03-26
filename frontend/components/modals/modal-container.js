import * as React from "react";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import PropTypes from "prop-types";
import { styled } from "@mui/material";
import clsx from "clsx";

export const ModalContainer = ({ children, open, handleClose }) => {
  
  const BackdropUnstyled = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
      <div
        className={clsx({ "MuiBackdrop-open": open }, className)}
        ref={ref}
        {...other}
      />
    );
  });
  BackdropUnstyled.displayName = "BackdropUnstyled";
  BackdropUnstyled.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
  };

  const Modal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Backdrop = styled(BackdropUnstyled)`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      slots={{ backdrop: Backdrop }}
    >
      {children}
    </Modal>
  );
};
ModalContainer.displayName = "ModalContainer";
