import { getUserAuth } from "./api/firebase_GM";
import "./App.css";
import SignIn from "./components/SignIn";

function App() {
  const auth = getUserAuth();
  const user = auth.currentUser;
  return (
    <div className="App">
      <header>
        <h4>🙏 소원을 빌여주세요!</h4>
        <button>로그아웃</button>
      </header>
      <section>
        {user ? "채팅방 호출 할 예정" : <SignIn auth={auth} />}
        <></>
        <></>
        <></>
      </section>
    </div>
  );
}

export default App;
