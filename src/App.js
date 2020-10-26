import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';



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
  const [loadClass, setloadClass] = useState([]);
  const [searchClasspath, setSearchClasspath] = useState([]);
  const [searchFiles, setSearchFiles] = useState([]);
  const [replaceExtendedMetaClasses, setReplaceExtendedMetaClasses] = useState([]);
  const [ViewRepositoryClientImpl, setViewRepositoryClientImpl] = useState([]);
  const [ViewRepositoryImpl, setViewRepositoryImpl] = useState([]);
  const [WebJARs, setWebJARs] = useState([]);


  async function dataParse() {
    const logs = datas();
    logs.then(function (log) {
      for (let i = 0; i < log.length; i++) {
        if (log[i] != undefined) {
          if (log[i]["loadClass"] != undefined) setloadClass(loadClass => loadClass.concat(log[i]["loadClass"]))
          if (log[i]["Messages.searchClasspath"] != undefined) setSearchClasspath(loadClass => loadClass.concat(log[i]["Messages.searchClasspath"]))
          if (log[i]["Messages.searchFiles"] != undefined) setSearchFiles(loadClass => loadClass.concat(log[i]["Messages.searchFiles"]))
          if (log[i]["Metadata.replaceExtendedMetaClasses"] != undefined) setReplaceExtendedMetaClasses(loadClass => loadClass.concat(log[i]["Metadata.replaceExtendedMetaClasses"]))
          if (log[i]["ViewRepository.init.ViewRepositoryClientImpl"] != undefined) setViewRepositoryClientImpl(loadClass => loadClass.concat(log[i]["ViewRepositoryClientImpl"]))
          if (log[i]["ViewRepository.init.ViewRepositoryImpl"] != undefined) setViewRepositoryImpl(loadClass => loadClass.concat(log[i]["ViewRepositoryImpl"]))
          if (log[i]["WebJARs"] != undefined) setWebJARs(loadClass => loadClass.concat(log[i]["WebJARs"]))
        }
      }
    });

  }

  useEffect(async () => {
    await dataParse()
  }, [])


  console.log(searchClasspath)
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
