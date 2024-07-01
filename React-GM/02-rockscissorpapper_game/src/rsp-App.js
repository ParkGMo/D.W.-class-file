import "./rsp-App.css";

function App() {
  return (
    <div className="rsp-App">
      <h1>Rock-Paper-Scissors Game</h1>
      <p>Welcome to the Rock-Paper-Scissors Game!</p>
      <p>Please select your move:</p>
      <button onClick={() => alert("You chose Rock!")}>Rock</button>
      <button onClick={() => alert("You chose Paper!")}>Paper</button>
      <button onClick={() => alert("You chose Scissors!")}>Scissors</button>
      <p>Developed by: Your Name</p>
    </div>
  );
}

export default App;
