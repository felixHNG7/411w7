import logo from './logo.svg';
import './App.css';


async function datas() {
  let json
  await fetch("https://pkdif6ysd5.execute-api.us-east-2.amazonaws.com/Perf_statistics_logs")
    .then(res => {
      json = res.json()
    }
    )
  return json;
}

function App() {
  const logs = datas();
  logs.then(function (log) {
    console.log(log)
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
