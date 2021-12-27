import { COLORS } from "@app/constants";
import React from "react";
import styled from "styled-components";

interface BtnProps {
  className?: string;
  label?: string;
  children?: React.ReactNode;
  type?: string;
  onClick?: (e?: any) => void;
}

const Button: React.FC<BtnProps> = ({
  label,
  className,
  children,
  onClick,
}) => {
  return (
    <BtnWrapper
      onClick={onClick}
      className={`btn ${className ? className : ""}`}
    >
      {children && children}
      {label || ""}
    </BtnWrapper>
  );
};

const BtnWrapper = styled.button`
  &.btn {
    border: none;
    cursor: pointer;
    &.btn_login {
      background-color: ${COLORS.cyan};
      height: 2rem;
      color: ${COLORS.white};
      font-weight: 600;
      font-size: 15px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 0px 0 rgba(0, 0, 0, 0.06);
      -webkit-box-shadow: 0 1px 0px 0 rgba(0, 0, 0, 0.1),
        0 1px 0px 0 rgba(0, 0, 0, 0.06);
      -moz-box-shadow: 0 1px 0px 0 rgba(0, 0, 0, 0.1),
        0 1px 0px 0 rgba(0, 0, 0, 0.06);
    }
    &.btn_logout {
      height: 2rem;
      width: 8rem;
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: 0.5px solid ${COLORS.Blue50};
      color: ${COLORS.davysGrey};
      text-transform: capitalize;
      transition: all 0.5s ease-in-out;
    }
    &.btn_logout:hover {
      background-color: ${COLORS.davysGrey};
      color: ${COLORS.white};
    }
    &.btn_add_user {
      height: 2rem;
      display: flex;
      align-items: center;
      text-transform: capitalize;
      font-weight: 600;
      background-color: ${COLORS.cyan};
      color: ${COLORS.white};
      border-radius: 5px;
    }
    &.btn_save_user {
      width: 100%;
      height: 2rem;
      background-color: ${COLORS.cyan};
      color: ${COLORS.white};
      border-radius: 5px;
      font-weight: 600;
      text-transform: uppercase;
    }
    &.btn_round {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      margin: 0 0.5rem;
      border-radius: 50%;
      opacity: 0;
      transform: translateX(2.5rem);
      color: ${COLORS.Blue50};
      transition: all 0.2s ease-in-out;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    &.opened {
      transform: translateX(0);
      opacity: 1;
    }
    &.btn_edit {
      background-color: ${COLORS.cyan};
    }
    &.btn_delete {
      background-color: ${COLORS.fleryRose};
    }
  }
  &.btn:focus {
    outline: none;
  }
  &.add_product_btn {
    height: 30px;
    background-color: ${COLORS.cyan};
    color: ${COLORS.white};
    border-radius: 0.2rem;
    font-weight: 600;
  }
`;

export default Button;
