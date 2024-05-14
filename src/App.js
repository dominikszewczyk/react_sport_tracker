import Stopwatch from "./components/Stopwatch/Stopwatch"
import Statistics from "./components/Statistics/Statistics";
import './App.css';

function App() {
    return (
        <div className="training">
            <h1>Running</h1>
            <Stopwatch />
            <Statistics />
        </div>
    );
}

export default App;
