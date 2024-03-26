import ModalUnstyled from "@mui/base/ModalUnstyled";
import { styled } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

/*
    Use the export Modal and Backdrop as below, have pulled these out of all modal implementations 
    to avoid duplication. Usage:
    <Modal
        open={}
        onClose={}
        slots={{ backdrop: Backdrop }}
    >
    ...
    </Modal>
*/

const BackdropUnstyled = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ "MuiBackdrop-open": open }, className)} ref={ref} {...other} />;
});

export const Modal = styled(ModalUnstyled)`
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

export const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

BackdropUnstyled.displayName = "BackdropUnstyled";

BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};
