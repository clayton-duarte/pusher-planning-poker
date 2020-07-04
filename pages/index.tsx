import React, { useEffect } from "react";
import styled from "styled-components";

import { useUser } from "../providers/user";
import Button from "../components/Button";

const Title = styled.h1`
  font-size: 32px;
`;

const Home = () => {
  const { user, clearUser, getUser } = useUser();
  // const router = useRouter();

  // const handleClick = async () => {
  //   try {
  //     const { data } = await Axios.post("/api/createRoom");
  //     router.push("/[roomId]", `/${data._id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    if (!user) getUser();
  }, [user]);

  return (
    <>
      <Title>Hello {user?.name}</Title>
      <Button onClick={clearUser}>Logout</Button>
    </>
  );
};

export default Home;
