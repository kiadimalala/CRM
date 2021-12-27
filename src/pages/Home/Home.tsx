import { Navigation } from "@app/components";
import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";

interface HomeProps {
  className?: string;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <GlobaWrapper className="global">
      <Navigation />
      <Layout className="layout">
        <Outlet />
      </Layout>
    </GlobaWrapper>
  );
};

export const GlobaWrapper = styled.div`
  &.global {
    height: 100%;
    width: 100%;
    display: flex;
  }
`;

export const Layout = styled.div`
  &.layout {
    width: 80%;
    height: 100%;
    padding: 0 2rem;
    overflow-y: auto;
  }
`;

export default Home;
