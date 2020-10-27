import './App.css';
import { useEffect, useState } from 'react';
import * as d3 from "d3";




function App() {
  const [loadClass, setloadClass] = useState([]);
  const [searchClasspath, setSearchClasspath] = useState([]);
  const [searchFiles, setSearchFiles] = useState([]);
  const [replaceExtendedMetaClasses, setReplaceExtendedMetaClasses] = useState([]);
  const [ViewRepositoryClientImpl, setViewRepositoryClientImpl] = useState([]);
  const [ViewRepositoryImpl, setViewRepositoryImpl] = useState([]);
  const [WebJARs, setWebJARs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function datas() {
    let json
    await fetch("https://pkdif6ysd5.execute-api.us-east-2.amazonaws.com/Perf_statistics_logs")
      .then(res => {
        json = res.json()
      }
      )
    return json;
  }

  async function dataParse() {
    try {
      setLoading(true)
      const logs = await datas().then(function (log) {
        for (let i = 0; i < log.length; i++) {
          if (log[i] !== undefined) {
            if (log[i]["loadClass"] !== undefined) {
              log[i]["loadClass"]["startDate"] = log[i].startDate;
              setloadClass(loadClass => loadClass.concat(log[i]["loadClass"]))
            }
            if (log[i]["Messages.searchClasspath"] !== undefined) {
              log[i]["Messages.searchClasspath"]["startDate"] = log[i].startDate;
              setSearchClasspath(searchClasspath => searchClasspath.concat(log[i]["Messages.searchClasspath"]))
            }
            if (log[i]["Messages.searchFiles"] !== undefined) {
              log[i]["Messages.searchFiles"]["startDate"] = log[i].startDate;
              setSearchFiles(searchFiles => searchFiles.concat(log[i]["Messages.searchFiles"]))
            }
            if (log[i]["Metadata.replaceExtendedMetaClasses"] !== undefined) {
              log[i]["Metadata.replaceExtendedMetaClasses"]["startDate"] = log[i].startDate;
              setReplaceExtendedMetaClasses(replaceExtendedMetaClasses => replaceExtendedMetaClasses.concat(log[i]["Metadata.replaceExtendedMetaClasses"]))
            }
            if (log[i]["ViewRepository.init.ViewRepositoryClientImpl"] !== undefined) {
              log[i]["ViewRepository.init.ViewRepositoryClientImpl"]["startDate"] = log[i].startDate;
              setViewRepositoryClientImpl(ViewRepositoryClientImpl => ViewRepositoryClientImpl.concat(log[i]["ViewRepository.init.ViewRepositoryClientImpl"]))
            }
            if (log[i]["ViewRepository.init.ViewRepositoryImpl"] !== undefined) {
              log[i]["ViewRepository.init.ViewRepositoryImpl"]["startDate"] = log[i].startDate;
              setViewRepositoryImpl(ViewRepositoryImpl => ViewRepositoryImpl.concat(log[i]["ViewRepository.init.ViewRepositoryImpl"]))
            }
            if (log[i]["WebJARs"] !== undefined) {
              log[i]["WebJARs"]["startDate"] = log[i].startDate;
              setWebJARs(WebJARs => WebJARs.concat(log[i]["WebJARs"]))
            }
          }
        }
      });
    }
    catch (e) {
      console.log(e)
    }
    finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    if (loadClass.length === 0)
      dataParse()
  }, []);

  useEffect(() => {

    if (!loading) {
      d3.selectAll("svg").remove();
      scatter_plot()
      scatter_plot()
    }
  }, [loading]);

  function getValues() {
    console.log(loadClass)
    console.log(searchClasspath)
    console.log(searchFiles)
    console.log(replaceExtendedMetaClasses)
    console.log(ViewRepositoryClientImpl)
    console.log(ViewRepositoryImpl)
    console.log(WebJARs)
    d3.selectAll("svg").remove();
  }


  const scatter_plot = () => {
    const margin = { top: 20, right: 20, bottom: 80, left: 60 },
      width = 300 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;



    const x = d3.scalePoint()
      .range([0, width])
      .padding(0.5);

    const y = d3.scaleLinear()
      .range([height, 0]);

    var svg = d3.select(".graph").append("svg")
      .attr("id", "svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    x.domain(loadClass.map(function (d) { return d.startDate; }));
    y.domain([0, 2])

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .attr("dy", "1.5em")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start"); 

    svg.append("g")
      .call(d3.axisLeft(y).ticks(5));

    svg.append("path")
      .datum(loadClass)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.startDate) })
        .y(function (d) { return y(d.Avg) })
      )

    svg.append('g')
      .selectAll("dot")
      .data(loadClass)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return x(d.startDate); })
      .attr("cy", function (d) { return y(d.Avg); })
      .attr("fill", "#69b3a2")
      .attr("r", 3)
  }

  return (
    <div className="App">
      <button onClick={getValues}>
        Print
        </button>
      <h2>Graph</h2>
      {loading ?
        <div>Loading ...</div>
        : <div className="graph">
        </div>}
    </div>
  );
}

export default App;
