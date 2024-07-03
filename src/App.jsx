import { FaCopy } from "react-icons/fa";
import { useState , useEffect } from "react";
import Message from "./message.jsx";

function App() {
  const[rangeValue,setRangeValue]=useState(1);
  const[pass,setPass] = useState('');
  const[success,setSuccess] = useState(false);
  const[error,setError] = useState(false);
  const[isCopyEmpty,setIsCopyEmpty] = useState(false);
  const[Options,setOptions] = useState([
    {
      Id:1,
      OptionName:"Upper Case",
      IsChecked:false,
      Value:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    },
    {
      Id:2,
      OptionName:"Lower Case",
      IsChecked:false,
      Value:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    },
    {
      Id:3,
      OptionName:"Special Characters",
      IsChecked:false,
      Value:[1,2,3,4,5,6,7,8,9,0]
    },
    {
      Id:4,
      OptionName:"Numbers",
      IsChecked:false,
      Value:['`','~','!','@','#','$','%','^','&','*','(',')','-','_','=','+','[',']','/','|',':',';','"',"'"]
    }
  ]);

  let string ='';
  let newArray=[];
  const border = document.querySelector(".input input");

  useEffect(()=>{
    if(border){
      const onlyTrue = Options.filter((option)=>option.IsChecked === true);
      if(onlyTrue.length === 1) border.style.border = "2px solid red";//red
      else if(onlyTrue.length === 2)border.style.border = "2px solid #fffe7a"; //yellow
      else if(onlyTrue.length === 3) border.style.border = "2px solid lime"; //green
      else if(onlyTrue.length === 4) border.style.border = "2px solid #B8252A"; //dark red
    }
  },[Options])// eslint-disable-line react-hooks/exhaustive-deps

  function handleCheck(id){
    const SpecificArray = Options.map((option)=> option.Id === id ? { ...option,IsChecked:!option.IsChecked} : option);
    setOptions(SpecificArray);
  }
  
  const GeneratePassword=()=>{
    const onlyTrue = Options.filter((option)=>option.IsChecked === true);
    onlyTrue.forEach((option)=>{
      newArray = [...newArray,...option.Value]
    })
    if(newArray.length === 0){
      setPass('');
      setSuccess(false);
      setError(true);
      setTimeout(()=>setError(false),3000);
    }
    else{
      setSuccess(false);
      setError(false);
      for(let i=1;i<=rangeValue;i++){
        const rand = Math.floor(Math.random() * newArray.length);
        const char = newArray[rand];
        string=string + char;
      }
      setPass(string);
    }
  }

  const CopyToClipboard = ()=>{
    if(pass.length === 0){
      setSuccess(false); 
      setError(false);
      setIsCopyEmpty(true);
      setTimeout(()=>setIsCopyEmpty(false),3000);
    }
    else{
      navigator.clipboard.writeText(pass);
      setSuccess(true);
      setError(false);
      setTimeout(()=>setSuccess(false),3000);
    }
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
        {
          isCopyEmpty && <Message 
            content="Cannot Copy Empty Password"
            color="#ef233c"
          />
        }
      </main>
    </div>
  );
}

export default App;
