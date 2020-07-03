import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Axios from "axios";

import { useUser } from "../providers/user";

const Title = styled.h1`
  font-size: 32px;
`;

const Home = () => {
  const { user, clearUser, getUser } = useUser();
  const router = useRouter();

  const handleClick = async () => {
    try {
      const { data } = await Axios.post("/api/createRoom");
      router.push("/[roomId]", `/${data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Title>Hello {user?.name}</Title>
      <button onClick={handleClick}>create room</button>
    </>
  );
};

export default Home;
