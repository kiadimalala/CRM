import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  DashboardOutlined,
  PeopleAltOutlined,
  ListAltOutlined,
  Settings,
} from "@mui/icons-material";
import { COLORS, ROUTES } from "@app/constants";
interface NavProps {
  className?: string;
  path: string;
  label: string;
  element: JSX.Element;
}

const Nav: React.FC<NavProps> = ({ path, label, element }) => {
  return (
    <LinkWrapper className="nav_link">
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <span className="icon">{element}</span>
        <span className="label">{label}</span>
      </NavLink>
    </LinkWrapper>
  );
};

const Links = () => {
  return (
    <LinksWrapper className="links">
      <Nav
        path={ROUTES.DASHBOARD}
        label="dashboard"
        element={<DashboardOutlined />}
      />
      <Nav
        path={ROUTES.CLIENTS}
        label="Clients"
        element={<PeopleAltOutlined />}
      />
      <Nav
        path={ROUTES.PRODUCTS}
        label="Produits"
        element={<ListAltOutlined />}
      />
      <Nav path={ROUTES.SETTINGS} label="Paramètres" element={<Settings />} />
    </LinksWrapper>
  );
};

const LinkWrapper = styled.div`
  &.nav_link {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    transition: all 0.5s ease-in-out;
    .active {
      border-right: 4px solid;
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
      border-right-color: ${COLORS.cyan};
      background-color: ${COLORS.Blue50};
      font-weight: 700;
    }
    a {
      width: 100%;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${COLORS.davysGrey};
      text-decoration: none;
      text-transform: capitalize;
      padding: 0 2.5rem;
      .icon {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .label {
        width: 80%;
        margin-left: 1rem;
      }
    }
  }
  &.nav_link:hover {
    background-color: ${COLORS.Blue50};
  }
`;

const LinksWrapper = styled.div`
  &.links {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

export default Links;
