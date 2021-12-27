import { COLORS } from "@app/constants";
import React from "react";
import styled from "styled-components";

interface InputProps {
  className?: string;
  type: string;
  value?: string | number;
  onChange?: (e: any) => void;
  children?: JSX.Element;
  placeholder?: string;
  maxLength?: number;
  checked?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  children,
  type,
  placeholder,
  value,
  className,
  onChange,
  maxLength,
  checked,
  disabled,
}) => {
  return (
    <InputWrapper className="input_wrapper">
      {children && children}
      <input
        className={`input ${className ? className : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        checked={checked}
        disabled={disabled}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  &.input_wrapper {
    position: relative;
    .search_input {
      height: 30px;
      width: 150px;
      border-radius: 5px;
      border: 1px solid ${COLORS.Blue50};
      color: ${COLORS.davysGrey};
      padding-left: 32px;
      transition: all 0.5s ease-in-out;
    }

    .search_input:focus {
      outline: none;
      width: 200px;
    }
    .query_input {
      height: 30px;
      width: 99%;
      border-radius: 5px;
      border: 1px solid ${COLORS.Blue50};
      color: ${COLORS.davysGrey};
      margin-top: 0.25rem;
    }
    .query_input:focus {
      outline: none;
    }
    span {
      position: absolute;
      top: 0;
      left: 0;
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${COLORS.davysGrey};
    }
  }
`;

export default Input;
