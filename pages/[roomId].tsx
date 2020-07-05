import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useUser } from "../providers/user";
import { useRoom } from "../providers/room";

const RoomPage = () => {
  const router = useRouter();
  const roomId = router.query.roomId;
  const { room, enterRoom, leaveRoom } = useRoom();
  const { user, getUser } = useUser();

  useEffect(() => {
    if (!user) getUser();
  }, [user]);

  useEffect(() => {
    if (!room && roomId && user) enterRoom(String(roomId));
    return leaveRoom;
  }, [room, roomId, user]);

  return (
    <>
      <p>you: {user?.name}</p>
      <p>room: {router.query.roomId}</p>
      <p>connection state: {room?.connection}</p>
      <ul>
        members
        {room?.members?.map(({ _id, name }) => (
          <li key={_id}>
            {name}
            {_id === user._id && " (you)"}
          </li>
        ))}
      </ul>
    </>
  );
};

export default RoomPage;
