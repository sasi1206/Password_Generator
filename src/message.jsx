import React from 'react';

const Message = ({content,color}) => {
  return (
    <div className="error-container" style={{
        backgroundColor : color,
        border: `1px solid ${color}`
    }}>
        <form onSubmit={(e)=>e.preventDefault()}> 
            <label>{content}</label>
          </form>
    </div>
  )
}

export default Message