import React, { useEffect } from "react";
import styled from "styled-components";
import Pusher from "pusher-js";

Pusher.logToConsole = process.env.NODE_ENV === "development";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

const Title = styled.h1`
  font-size: 50px;
`;

const Home = () => {
  const subscribeToChannel = () => {
    const channel = pusher.subscribe("my_channel");
    channel.bind("my_event", (data) => console.log(JSON.stringify(data)));
  };

  useEffect(() => {
    subscribeToChannel();
  }, []);

  return (
    <>
      <Title>My page</Title>
    </>
  );
};

export default Home;
