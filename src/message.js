import React from 'react';
import { FaX } from "react-icons/fa6";

const Message = ({content,color}) => {
  return (
    <div className="error-container" style={{
        backgroundColor : color,
        border: `1px solid ${color}`
    }}>
        <form onSubmit={(e)=>e.preventDefault()}> 
            <label>{content}</label>
            <button><FaX className="icon"/></button>
          </form>
    </div>
  )
}

export default Message