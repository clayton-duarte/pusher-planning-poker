import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Axios from "axios";

import pusher from "../libs/pusher-client";

const RoomPage = () => {
  const [connectionState, setConnectionState] = useState<any>();
  const [currentRoom, setCurrentRoom] = useState<any>();
  const router = useRouter();
  const roomId = router.query.roomId;

  const handleClickServer = async () => {
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

  const registerToRoom = async () => {
    try {
      const { data } = await Axios.post("/api/enterRoom", {
        roomId,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickLocal = () => {
    currentRoom.trigger("client-message", { message: "client message" });
  };

  useEffect(() => {
    pusher.connection.bind("state_change", (states) => {
      setConnectionState(states.current);
    });
    if (roomId) {
      setCurrentRoom(pusher.subscribe(String(roomId)));
      registerToRoom();
    }
  }, [roomId]);

  const subscribeToRoomEvents = () => {
    currentRoom.bind("broadcast", (data) => console.log(JSON.stringify(data)));
    currentRoom.bind("client-message", (data) =>
      console.log(JSON.stringify(data))
    );
  };

  useEffect(() => {
    currentRoom && subscribeToRoomEvents();
  }, [currentRoom]);

  return (
    <>
      <p>room: {router.query.roomId}</p>
      <button onClick={handleClickServer}>send server message</button>
      <button onClick={handleClickLocal}>send local message</button>
      <p>connection state: {connectionState}</p>
    </>
  );
};

export default RoomPage;
