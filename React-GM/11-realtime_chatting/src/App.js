import { useEffect, useState } from "react";
import { getUserAuth } from "./api/firebase_GM";
import "./App.css";
import SignIn from "./components/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import ChatRoom from "./components/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const auth = getUserAuth();
  const [user] = useAuthState(auth);
  // const user = auth.currentUser;
  // const [loginUser, setLoginUser] = useState(user);
  const handleLogout = () => {
    auth.signOut();
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     setLoginUser(user);
  //   });
  // }, []);
  return (
    <div className="App">
      <header>
        <h4>🙏 소원을 빌어주세요!</h4>
        <button onClick={handleLogout} className="sign-out">
          로그아웃
        </button>
      </header>
      <section>
        {user ? <ChatRoom auth={auth} /> : <SignIn auth={auth} />}
      </section>
    </div>
  );
}

export default App;
