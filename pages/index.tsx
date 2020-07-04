import React, { useEffect } from "react";
import styled from "styled-components";

import { useRoom } from "../providers/room";
import { useUser } from "../providers/user";
import Button from "../components/Button";

const Title = styled.h1`
  font-size: 32px;
`;

const Home = () => {
  const { user, clearUser, getUser } = useUser();
  const { clearRoom, createRoom } = useRoom();

  useEffect(() => {
    if (!user) {
      clearRoom();
      getUser();
    }
  }, [user]);

  return (
    <>
      <Title>Hello {user?.name}</Title>
      <Button onClick={clearUser}>Logout</Button>
      <Button onClick={createRoom}>Create Room</Button>
    </>
  );
};

export default Home;
