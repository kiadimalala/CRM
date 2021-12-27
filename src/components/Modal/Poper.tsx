import { COLORS } from "@app/constants";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled, Box } from "@mui/system";
import React from "react";

interface PoperProps {
  className?: string;
  children?: JSX.Element;
  open: boolean;
  onClose?: (e: any) => void;
}

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
  :focus {
    outline: none;
  }
  .content {
    background-color: #fff;
    height: auto;
    width: 30%;
    border-radius: 5px;
    padding: 0.75rem;
  }
  .content:focus {
    outline: none;
  }
  .lg_modal {
    width: 40%;
    height: 90%;
  }
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Poper: React.FC<PoperProps> = ({
  children,
  open,
  onClose,
  className,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={`modal_wrapper`}
      BackdropComponent={Backdrop}
    >
      <div className={` content ${className ? className : ""}`}>
        {children && children}
      </div>
    </Modal>
  );
};

export default Poper;
