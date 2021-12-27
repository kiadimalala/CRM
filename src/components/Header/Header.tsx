import React from "react";
import { COLORS } from "@app/constants";
import { useAppContext } from "@app/store";
import styled from "styled-components";
import { Button } from "@app/components";
import { Add } from "@mui/icons-material";

interface HeaderProps {
  className?: string;
  title: string;
  btnName?: string;
  onClick?: (e: any) => void;
}

const Header: React.FC<HeaderProps> = ({ title, onClick, btnName }) => {
  const {
    AuthHook: { user },
  } = useAppContext();
  return (
    <HeaderWrapper className="header">
      <div className="title">
        <h1>{title}</h1>
      </div>
      <div className="action">
        {user && user?.role === "adm" && (
          <Button
            onClick={onClick}
            label={btnName}
            className="btn_add_user"
          >
            <Add />
          </Button>
        )}
      </div>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  &.header {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    .title {
      width: 80%;
      color: ${COLORS.davysGrey};
    }
    .action {
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: end;
    }
  }
`;

export default Header;
