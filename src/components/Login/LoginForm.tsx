import { COLORS } from "@app/constants";
import { AuthModels } from "@app/models";
import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@app/components";
import { AuthService } from "@app/services";
import { writeToLS } from "@app/utils";
import { useAppContext } from "@app/store";
import { useLocation, useNavigate } from "react-router";

interface Props extends AuthModels.ILogin {
  className?: string;
}

const LoginForm: React.FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    AuthHook: { setUser, setLoading },
  } = useAppContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    AuthService.Login(email, password).then((res) => {
      if (!res.data.success) {
        setError(true);
      }
      if (res.data.success) {
        AuthService.AuthUser().then((res) => {
          setUser(res);
          navigate(from, { replace: true });
          setEmail("");
          setPassword("");
        });
      }
    });
  };

  return (
    <LoginWrapper className="wrapper">
      <form onSubmit={handleSubmit} className="login_form">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          type="email"
          placeholder="Email..."
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          value={password}
          type="password"
          placeholder="Mot de passe"
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <Button type="submit" className="btn_login" label="Se connecter" />
      </form>
      <p className={`error_msg ${error ? "show" : ""}`}>
        Email ou mot de passe incorrect
      </p>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  &.wrapper {
    position: relative;
    background-color: ${COLORS.white};
    width: 325px;
    height: 250px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 0px 0 rgba(0, 0, 0, 0.06);
    -webkit-box-shadow: 0 1px 0px 0 rgba(0, 0, 0, 0.1),
      0 1px 0px 0 rgba(0, 0, 0, 0.06);
    -moz-box-shadow: 0 1px 0px 0 rgba(0, 0, 0, 0.1),
      0 1px 0px 0 rgba(0, 0, 0, 0.06);
    .login_form {
      display: flex;
      flex-direction: column;
      padding: 1rem 0;
      label {
        margin-bottom: 0.25rem;
        color: ${COLORS.davysGrey};
      }
      input {
        height: 2rem;
        margin-bottom: 1.25rem;
        border: 2px solid ${COLORS.mintCream};
        padding-left: 0.5rem;
      }
    }
    .error_msg {
      width: 100%;
      position: absolute;
      color: ${COLORS.fleryRose};
      text-align: center;
      font-size: small;
      margin: 0;
      bottom: 1rem;
      left: 0;
      right: 0;
      opacity: 0;
      transition: all 0.5s ease-in-out;
    }
    .show {
      opacity: 1;
    }
  }
`;

export default LoginForm;
