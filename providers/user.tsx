import React, {
  FunctionComponent,
  createContext,
  useReducer,
  useContext,
  Dispatch,
} from "react";
import Axios from "axios";

import { useModal } from "./modal";
import { User } from "../types";

// STATE
const initialState: User = null;

export enum ActionTypes {
  CLEAR_USER = "CLEAR_USER",
  GET_USER = "GET_USER",
  SET_USER = "SET_USER",
}

interface Action {
  payload?: Partial<User>;
  type: ActionTypes;
}

const UserContext = createContext<[User, Dispatch<Action>]>([
  initialState,
  null,
]);

// REDUCER
const reducer = (state: User, action: Action) => {
  switch (action.type) {
    case ActionTypes.GET_USER:
      return { ...state, ...action.payload };
    case ActionTypes.SET_USER:
      return { ...state, ...action.payload };
    case ActionTypes.CLEAR_USER:
      return null;
    default:
      return state;
  }
};

// HOOK
export const useUser = () => {
  const [user, dispatch] = useContext(UserContext);
  const { openModal } = useModal();

  const setUser = async (user: User) => {
    const { data } = await Axios.post<User>("/api/createUser", user);
    dispatch({
      type: ActionTypes.SET_USER,
      payload: data,
    });
  };

  const getUser = async () => {
    try {
      const { data } = await Axios.post<User>("/api/getUser", user);
      dispatch({
        type: ActionTypes.GET_USER,
        payload: data,
      });
    } catch (err) {
      switch (err.response?.status) {
        case 404:
          return openModal();
        default:
          return console.log(err);
      }
    }
  };

  const clearUser = async () => {
    await Axios.post<User>("/api/clearUser");
    dispatch({
      type: ActionTypes.CLEAR_USER,
    });
  };

  return { user, getUser, setUser, clearUser };
};

// PROVIDER
const Provider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
