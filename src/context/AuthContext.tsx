import { createContext, useState, useEffect, ReactNode } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseApp";

interface AuthProps {
  children: ReactNode;
}

const AuthContext = createContext({
  user: null as User | null,
});

// 현재 state에 저장된 유저값을 리턴
export const AuthContextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // 유저가 있는 경우
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(user);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
