import React, {useState, useEffect} from 'react';

var SingleDisplay = function({singleWord}) {
  const [defination, setDefination] = useState(false)

  return (
    <div>
      <span onClick = {()=> {setDefination(!defination)}}>{singleWord.word}</span>
      {defination? <span>:  {singleWord.defination}</span>:null}
    </div>

  )
}


var ChooseDisplay = function({mode, changeModeFunc, wordList, changeWordListFunc}) {
  const [whetherShuffle, setWetherShuffle] = useState(false);
  var newList = [];

  var shuffle = function(wordList) {
    changeModeFunc();
    while (wordList.length > 0) {
      var index = Math.floor(Math.random() * wordList.length)
      newList.push(wordList[index])
      wordList.splice(index, 1)
    }
    changeWordListFunc(newList);
  }


  return (
    <div>
      <button className = 'button' onClick={()=>shuffle(wordList)}>shuffle and memorize</button>
      {mode? (
            <div className = 'modal-content'>
            <div className = 'modal-header'>
              <h4 className = 'modal-title'>Vocabulary List</h4>
            </div>
            <div className = 'modal-body'>
              {wordList.map((word) => {return <SingleDisplay key = {word.word} singleWord = {word}/>})}
            </div>
            <div className= 'modal-footer'>
              <button className = 'button' onClick={changeModeFunc}>Close</button>
            </div>
          </div>
      ): null}
    </div>

  )
}

export default ChooseDisplay;