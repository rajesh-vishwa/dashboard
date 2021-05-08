import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { USERS_TOKEN } from "../utils/constant";

export type Email = {
  id: string;
  to: string;
  cc: string;
  subject: string;
  body: string;
  status: "NEW" | "READ";
};

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
};
type ModalViews = "EMAIL_COMPOSE_VIEW" | "EMAIL_READ_VIEW";
type AppContextState = {
  user: User | null;
  displayModal: boolean;
  modalView: ModalViews;
};

const initialState: AppContextState = {
  user: { id: 1, email: "user1@test.com", password: "test", name: "User One" },
  displayModal: false,
  modalView: "EMAIL_COMPOSE_VIEW",
};

type Action =
  | {
      type: "AUTHENTICATED";
      payload: User;
    }
  | {
      type: "OPEN_MODAL";
    }
  | {
      type: "CLOSE_MODAL";
    }
  | {
      type: "MODAL_VIEW";
      payload: ModalViews;
    }
  | {
      type: "LOGOUT";
    };

function appReducer(state: AppContextState, action: Action) {
  switch (action.type) {
    case "AUTHENTICATED": {
      return {
        ...state,
        user: action.payload,
      };
    }

    case "MODAL_VIEW": {
      return {
        ...state,
        modalView: action.payload,
      };
    }
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        displayModal: false,
      };
    }
    default: {
      throw new Error(`Unsupported action type: ${action}`);
    }
  }
}

const AppContext = React.createContext<AppContextState | any>(initialState);

AppContext.displayName = "AppContext";

export const AppProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const authenticated = (value: User) =>
    dispatch({ type: "AUTHENTICATED", payload: value });

  const openModal = () => dispatch({ type: "OPEN_MODAL" });
  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });
  const setModalView = (view: ModalViews) =>
    dispatch({ type: "MODAL_VIEW", payload: view });

  const logout = async () => dispatch({ type: "LOGOUT" });

  useEffect(() => {
    // load user and default emails

    const users: User[] = [
      { id: 1, email: "user1@test.com", password: "test", name: "User One" },
      { id: 2, email: "user2@test.com", password: "test", name: "User Two" },
    ];
    window.localStorage.setItem(USERS_TOKEN, JSON.stringify(users));
    return () => {};
  }, []);

  const values = useMemo(
    () => ({
      ...state,
      authenticated,
      closeModal,
      openModal,
      setModalView,
      logout,
    }),
    [state]
  );

  return (
    <AppContext.Provider value={{ ...values }}>{children}</AppContext.Provider>
  );
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error(`useApp must be used within a CountProvider`);
  }
  return context;
};
