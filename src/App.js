import { FaCopy } from "react-icons/fa";
import { useState , useEffect } from "react";
import Message from "./message.js";

function App() {
  const[rangeValue,setRangeValue]=useState(1);
  const[pass,setPass] = useState('');
  const[success,setSuccess] = useState(false);
  const[error,setError] = useState(false);
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
  let newArray=[];
  const border = document.querySelector(".input input");

  useEffect(()=>{
    if(border){
      if(rangeValue <= 5) border.style.border = "2px solid red";
      else if(rangeValue <=10 && rangeValue > 5) border.style.border = "2px solid #fffe7a";
      else if(rangeValue <=15 && rangeValue > 10) border.style.border = "2px solid lime";
      else border.style.border = "2px solid #B8252A";
    }
  },[rangeValue])

  function handleCheck(id){
    const filterArray = Options.find(option=>option.Id === id);
    if(filterArray.OptionName == 'Upper Case')setCheckUpperCase(!CheckUpperCase);
    else if(filterArray.OptionName == 'Lower Case')
    setCheckLowerCase (!CheckLowerCase);
    else if(filterArray.OptionName == 'Special Characters')setCheckSpecialCharacters(!CheckSpecialCharacters);
    else if(filterArray.OptionName == 'Numbers')setCheckNumbers (!CheckNumbers);
  }
  
  const GeneratePassword=()=>{
    if(CheckUpperCase){
      newArray = [...newArray,...UpperCase]; 
    }
    if(CheckLowerCase){
      newArray = [...newArray,...LowerCase];
    } 
    if(CheckNumbers){
      newArray = [...newArray,...Numbers];
    } 
    if(CheckSpecialCharacters){
      newArray = [...newArray,...SpecialCharacters]; 
    } 

    if(newArray.length === 0){
      setPass(' ');
      setSuccess(false);
      setError(true);
    }
    else{
      for(let i=1;i<=rangeValue;i++){
        const rand = Math.floor(Math.random() * newArray.length);
        const char = newArray[rand];
        string=string + char;
      }
      setPass(string)
    }
  }

  const CopyToClipboard = ()=>{
    navigator.clipboard.writeText(pass);
    if(newArray.length > 0) setSuccess(true)
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
            <button onClick={CopyToClipboard}><FaCopy/></button>
          </section>
          <section className="slider">
            <label >Password Length</label>
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
        {
          success && <Message
          content="Your Password Is Copied"
          color="#52b788"
        />
        }
        {
          error && <Message
          content="Please Select One of the Options"
          color="#ef233c"
          />
        }
      </main>
    </div>
  );
}

export default App;
