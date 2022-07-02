import React from 'react';
import Defination from './Defination.jsx';
// import Popup from 'react-popup';

var SingleWord = function({singleWord, addDefFunc, deleteFunc}) {
  var handleEdit = function(e) {
    e.preventDefault();
    addDefFunc(singleWord.word, null)
  }
  var handleDelete = function(e) {
    e.preventDefault();
    deleteFunc(singleWord)
  }
  return (

    <div>
      <h3>
        <span>{singleWord.word}  </span>
        <span>
          <button onClick = {handleEdit}>edit</button>
          <button onClick = {handleDelete}>delete</button>
        </span>
      </h3>
      <h6>{singleWord.defination? singleWord.defination : <Defination addDefFunc = {addDefFunc} singleWord = {singleWord}/>}</h6>
    </div>
  )
}

export default SingleWord;