import React, {
  FunctionComponent,
  createContext,
  useReducer,
  useContext,
  Dispatch,
} from "react";

// STATE
interface InitialState {
  isOpen: boolean;
}

const initialState: InitialState = {
  isOpen: true,
};

export enum ActionTypes {
  CLOSE_MODAL = "CLOSE_MODAL",
  OPEN_MODAL = "OPEN_MODAL",
}

interface Action {
  payload?: Partial<InitialState>;
  type: ActionTypes;
}

const ModalContext = createContext<[InitialState, Dispatch<Action>]>([
  initialState,
  null,
]);

// REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.CLOSE_MODAL:
      return { ...state, isOpen: false };
    case ActionTypes.OPEN_MODAL:
      return { ...state, isOpen: true };
    default:
      return state;
  }
};

// HOOK
export const useModal = () => {
  const [{ isOpen }, dispatch] = useContext(ModalContext);

  const openModal = () => {
    dispatch({ type: ActionTypes.OPEN_MODAL });
  };

  const closeModal = () => {
    dispatch({ type: ActionTypes.CLOSE_MODAL });
  };

  return { isOpen, openModal, closeModal };
};

// PROVIDER
const Provider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={[state, dispatch]}>
      {children}
    </ModalContext.Provider>
  );
};

export default Provider;
