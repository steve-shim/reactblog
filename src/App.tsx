import { useEffect, useState, useContext } from "react";
import { app, db } from "./firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Router from "./components/Router";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ThemeContext from "./context/ThemeContext";

function App() {
  const context = useContext(ThemeContext);
  const auth = getAuth(app);
  console.log("auth", auth);
  // auth를 체크하기 전에 (initialize 전)에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);

  // auth의 currentUser가 있으면 authenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("App useEffect 실행", auth);
      // 유저가 있는 경우
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className={context.theme === "light" ? "white" : "dark"}>
      <ToastContainer />
      {/* <Router isAuthenticated={isAuthenticated} /> */}
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </div>
  );
}

export default App;
