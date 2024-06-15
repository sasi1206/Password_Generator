import { FaCopy } from "react-icons/fa";
import { useState , useEffect} from "react";

function App() {
  const[rangeValue,setRangeValue]=useState(1);
  const[pass,setPass] = useState('')
  const Options = [
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
  ];
  const[CheckUpperCase,setCheckUpperCase] = useState(false);
  const[CheckLowerCase,setCheckLowerCase] = useState(false);
  const[CheckNumbers,setCheckNumbers] = useState(false);
  const[CheckSpecialCharacters,setCheckSpecialCharacters] = useState(false);
  const UpperCase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  const LowerCase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const Numbers = [1,2,3,4,5,6,7,8,9,0];
  const SpecialCharacters = ['`','~','!','@','#','$','%','^','&','*','(',')','-','_','=','+','[',']','/','|',':',';','"',"'"];

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

  let newArray = [];

  function handleCheck(id){
    const filterArray = Options.find(option=>option.Id === id);
    if(filterArray.OptionName == 'Upper Case'){
      setCheckUpperCase(!CheckUpperCase);
      console.log(newArray);
      newArray = [...newArray,...UpperCase];
      console.log(newArray);
    }
    else if(filterArray.OptionName == 'Lower Case'){
      setCheckLowerCase (!CheckLowerCase);
      console.log(newArray);
      newArray = [...newArray,...LowerCase];
      console.log(newArray);
      }
      else if(filterArray.OptionName == 'Special Characters'){
      setCheckSpecialCharacters(!CheckSpecialCharacters);
      console.log(newArray);
      newArray = [...newArray,...SpecialCharacters];
      console.log(newArray);
    }
    else if(filterArray.OptionName == 'Numbers'){
      setCheckNumbers (!CheckNumbers);
      console.log(newArray);
      newArray = [...newArray,...Numbers];
      console.log(newArray);
    }
    console.log(newArray);
  }

  const GeneratePassword=()=>{
    console.log(newArray);
    for(let i=1;i<=rangeValue;i++){
      const rand = Math.floor(Math.random() * newArray.length);
      console.log(rand)
      const char = newArray[rand];
      string=string + char;
      console.log(string);
    }
    setPass(string)
    console.log(newArray);
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
            onClick={GeneratePassword}  
          >Generate Password</button>
        </form>
      </main>
    </div>
  );
}

export default App;
