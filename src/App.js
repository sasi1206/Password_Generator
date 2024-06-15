import { FaCopy } from "react-icons/fa";
import { useState , useEffect} from "react";

function App() {
  const[rangeValue,setRangeValue]=useState(1);
  const[pass,setPass] = useState('')
  const CharaterArray = [
    {
      Id:1,
      OptionName:"Upper Case",
      CharCode: [65,90]
    },
    {
      Id:2,
      OptionName:"Lower Case",
      CharCode: [97,122]
    },
    {
      Id:3,
      OptionName: "Special Characters",
      CharCode: [33,47]
    },
    {
      Id:4,
      OptionName: "Numbers",
      CharCode: [48,57]
    }
  ];
  const Options = [
    {
      Id:1,
      OptionName:"Upper Case",
      checked: false
    },
    {
      Id:2,
      OptionName:"Lower Case",
      checked: false
    },
    {
      Id:3,
      OptionName:"Special Charaters",
      checked: false
    },
    {
      Id:4,
      OptionName:"Numbers",
      checked: false
    }
  ];
  let string ='';
  const border = document.querySelector(".input input");

  useEffect(()=>{
    if(border){
      if(rangeValue == 1 )border.style.border = "1px solid black";
      else if(rangeValue <= 5 && rangeValue > 1) border.style.border = "2px solid red";
      else if(rangeValue <=10 && rangeValue > 5) border.style.border = "2px solid #fffe7a";
      else if(rangeValue <=15 && rangeValue > 10) border.style.border = "2px solid lime";
      else border.style.border = "2px solid #B8252A";
    }
  },[rangeValue])

  const handleCheck = (id)=>{
    console.log(id);
  }

  const GeneratePassword=(min,max)=>{
    for(let i=1;i<=rangeValue;i++){
      const rand = Math.floor(Math.random() * (max - min + 1) + min);
      const char = String.fromCharCode(rand);
      string=string + char;
    }
    setPass(string)
  }

  return (
    <div className="App">
      <main className="con">
        <p className="title">Password Generator</p>
        <form onSubmit={(e)=> e.preventDefault()}>
          <section className="input">
            <input
              type="text"
              disabled
              value={pass}
            />
            <button><FaCopy/></button>
          </section>
          <section className="slider">
            <label>Password Length</label>
            <input 
              type="range"
              onChange={(e)=>setRangeValue(e.target.value)}
              value={rangeValue}
              min={1}
              max={20}
            /><p>{rangeValue}</p>
          </section>
          <section className="options">
            <label className="tit">Password Options</label>
            <table>
              <tbody>
                  <tr>
                      
                  </tr>
              </tbody>
            </table>
          </section>
          <button 
            className="gen"
            onClick={()=>GeneratePassword(65,90)}  
          >Generate Password</button>
        </form>
      </main>
    </div>
  );
}

export default App;
