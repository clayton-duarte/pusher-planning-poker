import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Axios from "axios";

import pusher from "../libs/pusher-client";

const RoomPage = () => {
  const router = useRouter();
  const roomId = router.query.roomId;

  const handleClick = async () => {
    try {
      const { data } = await Axios.post("/api/roomBroadcast", {
        message: "test",
        roomId,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const subscribeToRoomEvents = (id) => {
    const room = pusher.subscribe(id);
    room.bind("broadcast", (data) => console.log(JSON.stringify(data)));
  };

  useEffect(() => {
    roomId && subscribeToRoomEvents(roomId);
  }, [roomId]);

  return (
    <>
      <p>room: {router.query.roomId}</p>
      <button onClick={handleClick}>send test message</button>
    </>
  );
};

export default RoomPage;
