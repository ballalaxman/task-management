import "./App.css";
import Board from "./Components/Board";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <main className="w-full font-montserrat h-[91vh]">
      <Navbar />
      <Board />
    </main>
  );
}

export default App;
