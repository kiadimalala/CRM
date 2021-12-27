import { COLORS } from "@app/constants";
import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Button, Links } from "@app/components";
import { LogoutOutlined } from "@mui/icons-material";
import { AuthService } from "@app/services";
import { useLocation, useNavigate } from "react-router";
import { useAppContext } from "@app/store";
import { removeFromLS } from "@app/utils";

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = () => {
  const {
    AuthHook: { user, setUser },
  } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";
  const handleLogout = (e: any) => {
    const logout = () => {
      e.preventDefault();
      if (user) {
        AuthService.Logout();
        removeFromLS("token");
        navigate(from, { replace: true });
      }
    };
    logout();
  };
  return (
    <NavigationWrapper className="navigation_wrapper">
      <div className="user_box">
        <div className="box">
          <span className="avatar">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </span>
          <span className="username">
            {user?.name} {user?.lastname}
          </span>
        </div>
        <Button
          onClick={(e: any) => handleLogout(e)}
          className="btn_logout"
          label="logout"
        >
          <LogoutOutlined />
        </Button>
      </div>
      <div className="links_box">
        <Links />
      </div>
    </NavigationWrapper>
  );
};

const NavigationWrapper = styled.div`
  &.navigation_wrapper {
    width: 20%;
    border-right: 1px solid ${COLORS.Blue50};
    .user_box {
      width: 100%;
      height: 30%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .box {
        width: 80%;
        display: flex;
        align-items: center;
        background-color: ${COLORS.Blue50};
        padding: 0.5rem;
        border-radius: 0.25rem;
        color: ${COLORS.davysGrey};
        .avatar {
          width: 20%;
          display: flex;
          justify-content: center;
        }
        .username {
          width: 80%;
          display: flex;
          justify-content: center;
          margin-left: 0.5rem;
          font-weight: 700;
        }
      }
    }
    .links_box {
      width: 100%;
      height: 70%;
      display: flex;
      justify-content: center;
    }
  }
`;

export default Navigation;
