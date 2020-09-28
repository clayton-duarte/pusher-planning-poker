import React, {
  FunctionComponent,
  createContext,
  useReducer,
  useContext,
  Dispatch,
} from "react";
import { useRouter, NextRouter } from "next/router";
import Axios from "axios";

import pusher, { PusherEvents } from "../libs/pusher-client";
import { Room } from "../types";

// STATE
export enum ActionTypes {
  SET_CONNECTION = "SET_CONNECTION",
  SET_CHANNEL = "SET_CHANNEL",
  CREATE_ROOM = "CREATE_ROOM",
  CLEAR_ROOM = "CLEAR_ROOM",
  GET_ROOM = "GET_ROOM",
}

interface Action {
  payload?: Partial<Room>;
  type: ActionTypes;
}

const RoomContext = createContext<[Room, Dispatch<Action>]>([null, null]);

// REDUCER
const reducer = (router: NextRouter) => (state: Room, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_CONNECTION:
      return { ...state, ...action.payload };
    case ActionTypes.CREATE_ROOM:
      router?.push("/[roomId]", `/${action.payload._id}`);
      return { ...state, ...action.payload };
    case ActionTypes.SET_CHANNEL:
      return { ...state, ...action.payload };
    case ActionTypes.CLEAR_ROOM:
      state?.channel?.unsubscribe();
      router?.push("/");
      return null;
    case ActionTypes.GET_ROOM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// HOOK
export const useRoom = () => {
  const [room, dispatch] = useContext(RoomContext);

  const createRoom = async () => {
    const { data } = await Axios.post<Room>("/api/createRoom");
    dispatch({
      type: ActionTypes.CREATE_ROOM,
      payload: data,
    });
  };

  const getRoom = async (roomId: string) => {
    try {
      const { data } = await Axios.post<Room>("/api/getRoom", { roomId });
      dispatch({
        type: ActionTypes.GET_ROOM,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const enterRoom = async (roomId: string) => {
    // Register to room channel
    const channel = pusher.subscribe(roomId);
    dispatch({
      type: ActionTypes.SET_CHANNEL,
      payload: { channel },
    });

    pusher.send_event(PusherEvents.UPDATE_ROOM, "entered");

    // Observe connection state
    pusher.connection.bind(PusherEvents.STATE_CHANGE, (states) => {
      dispatch({
        type: ActionTypes.SET_CONNECTION,
        payload: { connection: states.current },
      });
    });

    // Observe room updates
    pusher.bind(PusherEvents.UPDATE_ROOM, (...params) => {
      console.log(PusherEvents.UPDATE_ROOM, ...params);
      getRoom(roomId);
    });

    // Get initial data
    getRoom(roomId);
  };

  const leaveRoom = () => {
    // room?.channel?.unsubscribe();
  };

  const clearRoom = async () => {
    dispatch({
      type: ActionTypes.CLEAR_ROOM,
    });
  };

  return { room, enterRoom, createRoom, clearRoom, leaveRoom };
};

// PROVIDER
const Provider: FunctionComponent = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer(router), null);

  return (
    <RoomContext.Provider value={[state, dispatch]}>
      {children}
    </RoomContext.Provider>
  );
};

export default Provider;
