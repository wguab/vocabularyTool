import React, {useState} from 'react';

var Defination = function({singleWord, addDefFunc}) {
  const [enter, setEnter] = useState('');

  var handleEnter = function(e) {
    e.preventDefault();
    setEnter(e.target.value)
  }

  var handleClick = function(e) {
    e.preventDefault();
    addDefFunc(singleWord.word, enter);
  }

  return (
    <form>
      <input type = 'text' placeholder = 'enter defination' onChange = {handleEnter}></input>
      <button onClick = {handleClick}>add defination</button>
    </form>

  )
}

export default Defination;