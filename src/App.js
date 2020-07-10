import React, { useEffect, useState } from 'react';
import './App.css';

import DragNDrop from './components/DragNDrop'
let items_1 = ['1', '2'];
let items_2 = ['4', '5'];
let items_3 = ['9', '10'];
const defaultData = [
  { title: 'group 1', items: items_1, width: ['250px'] },
  { title: 'group 2', items: items_2, width: ['250px'] },
  { title: 'group 3', items: items_3, width: ['600px'] }
]

function App() {
  const [data, setData] = useState();
  const [state, setState] = useState(false);
  const [header, setHeader] = useState("Drew's Analytics Dashboard")
  useEffect(() => {

    if (localStorage.getItem('List')) {
      setData(JSON.parse(localStorage.getItem('List')))
    }

    else {
      setData(defaultData)
    }
  }, [setData])
  const changeText = (e) => {
    console.log(e)
    setState(true)
    setHeader(e)

  }
  const onAddLayout = () => {

    function makeid(length) {
      var result = '';
      var char = 'abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ';
      var charsLength = char.length;
      for (var i = 0; i < length; i++) {
        result += char.charAt(Math.floor(Math.random() * charsLength))

      }
      return result;

    }
    // console.log(makeid(2))
    items_1.push(makeid(2))
    const defaultData = [
      { title: 'group 1', items: items_1, width: ['250px'], bg: ["white"] },
      { title: 'group 2', items: items_2, width: ['250px'], bg: ["white"] },
      { title: 'group 3', items: items_3, width: ['600px'], bg: ["white"] }
    ]


    setData(defaultData)
    localStorage.setItem('List', JSON.stringify(defaultData))
  }
  const finish=()=>{alert("Done")
  console.log("done")}

  return (
    <div >
      <nav style={{ backgroundColor: "black", color: "white", padding: 10 }}>
        <a style={{ color: "white", textDecoration: "none", margin: "2rem" }} href="/">dashabang </a>
      </nav>
      <h3 class="w3-container" style={{ fontWeight: "bold" }}>{state ? <Results /> : header} <i onClick={e => changeText(e.target.value)} className="fa fa-edit"></i></h3>
      <div class="bg"style={{ backgroundColor: "#cecece", border: "2px solid  #301f27d2" }} >


        <header className="App-header w3-panel">
          <div style={{ display: "" }}>
            <button id="AddButton"style={{ fontWeight: "bold",marginLeft: "50px" }} onClick={onAddLayout} >New Widget <i className="fa fa-plus"></i></button>
            <em><h2 style={{ textAlign: "center", fontWeight: "bold", color: " #36242dd2" }}>Drag a widget into an open slot</h2></em>
          </div>
          <DragNDrop  data={data} />

        </header>
      </div>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"end",margin:"20px"}}>
      <button  onClick={()=>alert("Back is disabled now")} style={{ fontSize:"20px",padding:"10px",margin:"10px",fontWeight: "bold",backgroundColor:"#DCDCDC",color:"grey",borderRadius:"5px" }}  >Back</button>
      <button onClick={finish} style={{fontSize:"20px",padding:"10px",margin:"10px", fontWeight: "bold",backgroundColor:"#2327d7",color:"white",borderRadius:"5px" }}  >Finish</button>
      </div>
    </div>
  );
}
const Results = () => (
  prompt('Enter the new header name, please ')
)

export default App;
