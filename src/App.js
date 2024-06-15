import { FaCopy } from "react-icons/fa";
import { useState , useEffect} from "react";

function App() {
  const[rangeValue,setRangeValue]=useState(1);
  const[pass,setPass] = useState('')
  const[Options,setOptions]=useState([
    {
      Id:1,
      OptionName:"Upper Case"
    },
    {
      Id:2,
      OptionName:"Lower Case"
    },
    {
      Id:3,
      OptionName:"Special Characters"
    },
    {
      Id:4,
      OptionName:"Numbers"
    }
  ]);
  const[UpperCase,setUpperCase] = useState(false);
  const[LowerCase,setLowerCase] = useState(false);
  const[Numbers,setNumbers] = useState(false);
  const[SpecialCharacters,setSpecialCharacters] = useState(false);
  let string ='';
  const border = document.querySelector(".input input");

  useEffect(()=>{
    if(border){
      if(rangeValue <= 5) border.style.border = "2px solid red";
      else if(rangeValue <=10 && rangeValue > 5) border.style.border = "2px solid #fffe7a";
      else if(rangeValue <=15 && rangeValue > 10) border.style.border = "2px solid lime";
      else border.style.border = "2px solid #B8252A";
    }
  },[rangeValue])

  const handleCheck = (id)=>{
    const filterArray = Options.find((option)=> option.Id === id);
   return filterArray.OptionName == 'Upper Case' ? setUpperCase(!UpperCase) : filterArray.OptionName == 'Lower Case' ? setLowerCase(!LowerCase) : filterArray.OptionName == 'Special Characters' ? setSpecialCharacters(!SpecialCharacters) : filterArray.OptionName == 'Numbers' ? setNumbers(!Numbers) : "nope";
  }

  const GeneratePassword=(min,max,UnwantedValueStart,UnwantedValueStop)=>{

    for(let i=1;i<=rangeValue;i++){
      const rand = Math.floor(Math.random() * (max - min + 1) + min);
    if(rand >= UnwantedValueStart  && rand <= UnwantedValueStop){ console.log(UnwantedValueStart,UnwantedValueStop)}
      const char = String.fromCharCode(rand);
      string=string + char;
    }
    setPass(string)
  }

  const MainFunction = ()=>{
      if(UpperCase && LowerCase && SpecialCharacters && Numbers) GeneratePassword(21,122);
      else if(Numbers && LowerCase ) GeneratePassword(48,122,58,96);
      else setPass('')
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
            <label >Password Length</label>
            <input
              key={1}
              type="range"
              onChange={(e)=>setRangeValue(e.target.value)}
              value={rangeValue}
              min={1}
              max={20}
            /><p key={2}>{rangeValue}</p>
          </section>
          <section className="options">
            <label className="tit">Password Options</label>
            {
              Options.map((option)=>
                <>
                  <input 
                    key={option.Id}
                    type="checkbox"
                    onChange={()=> handleCheck(option.Id)}
                  />
                  <label>{option.OptionName}</label>
                </>
              )
            }
          </section>
          <button 
            className="gen"
            onClick={MainFunction}  
          >Generate Password</button>
        </form>
      </main>
    </div>
  );
}

export default App;
