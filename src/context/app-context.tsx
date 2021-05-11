import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { users, emails } from "../data/data";
import { EMAILS_TOKEN, USERS_TOKEN } from "../utils/constant";

export type Email = {
  id: string;
  to: string;
  cc: string;
  from: string;
  fromName: string;
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
  selectedEmail: Email | null;
  userEmails: Email[];
};

const initialState: AppContextState = {
  // make user null when deplay on production
  user: null,
  displayModal: false,
  modalView: "EMAIL_COMPOSE_VIEW",
  selectedEmail: null,
  userEmails: [],
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
      type: "SELECTED_EMAIL";
      payload: Email;
    }
  | {
      type: "USER_EMAILS";
      payload: Email[];
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
    case "USER_EMAILS": {
      return {
        ...state,
        userEmails: action.payload,
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
        selectedEmail: null,
        userEmails: [],
      };
    }
    case "SELECTED_EMAIL": {
      return {
        ...state,
        selectedEmail: action.payload,
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
  const setEmailComposeView = () =>
    dispatch({ type: "MODAL_VIEW", payload: "EMAIL_COMPOSE_VIEW" });

  const setEmailReadView = () =>
    dispatch({ type: "MODAL_VIEW", payload: "EMAIL_READ_VIEW" });

  const setSelectedEmail = (email: Email) =>
    dispatch({ type: "SELECTED_EMAIL", payload: email });

  const setUserEmails = (emails: Email[]) =>
    dispatch({ type: "USER_EMAILS", payload: emails });
  const logout = async () => dispatch({ type: "LOGOUT" });

  useEffect(() => {
    // load user and default emails

    window.localStorage.setItem(USERS_TOKEN, JSON.stringify(users));
    window.localStorage.setItem(EMAILS_TOKEN, JSON.stringify(emails));
    return () => {};
  }, []);

  const values = useMemo(
    () => ({
      ...state,
      authenticated,
      closeModal,
      openModal,
      setEmailComposeView,
      setEmailReadView,
      setSelectedEmail,
      setUserEmails,
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
