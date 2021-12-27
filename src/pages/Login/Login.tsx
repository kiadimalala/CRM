import React from "react";
import { COLORS } from "@app/constants";
import styled from "styled-components";
import {LoginForm} from "@app/components";

interface LoginProps  {
  className?: string;
}

const Login: React.FC<LoginProps> = () => {
  return (
    <LoginWrapper className="wrapper">
      <LoginForm email={""} password={""} />
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  &.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.mintCream};
  }
`;
