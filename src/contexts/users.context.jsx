import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromUserAuth,
} from "../utilities/firebase/firebase.utility";

export const UserContext = createContext({
  user: null,
  setUser: () => null,
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = { user, setUser };
  useEffect(() => {
    const unsub = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromUserAuth(user);
      }
      setUser(user);
      return unsub;
    });
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};