import React, {
  FunctionComponent,
  createContext,
  useReducer,
  useContext,
  Dispatch,
} from "react";
import { useRouter, NextRouter } from "next/router";
import Axios from "axios";

import { Room } from "../types";

// STATE
const initialState: Room = null;

export enum ActionTypes {
  CREATE_ROOM = "CREATE_ROOM",
  CLEAR_ROOM = "CLEAR_ROOM",
  ENTER_ROOM = "ENTER_ROOM",
}

interface Action {
  payload?: Partial<Room>;
  type: ActionTypes;
}

const RoomContext = createContext<[Room, Dispatch<Action>]>([
  initialState,
  null,
]);

// REDUCER
const reducer = (router: NextRouter) => (state: Room, action: Action) => {
  switch (action.type) {
    case ActionTypes.CREATE_ROOM:
      router.push("/[roomId]", `/${action.payload._id}`);
      return { ...state, ...action.payload };
    case ActionTypes.ENTER_ROOM:
      return { ...state, ...action.payload };
    case ActionTypes.CLEAR_ROOM:
      return null;
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

  const enterRoom = async (roomId) => {
    try {
      const { data } = await Axios.post<Room>("/api/enterRoom", { roomId });
      dispatch({
        type: ActionTypes.ENTER_ROOM,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const clearRoom = async () => {
    dispatch({
      type: ActionTypes.CLEAR_ROOM,
    });
  };

  return { room, enterRoom, createRoom, clearRoom };
};

// PROVIDER
const Provider: FunctionComponent = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer(router), initialState);

  return (
    <RoomContext.Provider value={[state, dispatch]}>
      {children}
    </RoomContext.Provider>
  );
};

export default Provider;
