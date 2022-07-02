import React, {useState} from 'react';

var Search = function({searchFunc}) {
  const [searchWord, setSearchWord] = useState('');
  var handleInput = function(e) {
    e.preventDefault();
    setSearchWord(e.target.value)
  }
  var handelSearch = function(e) {
    e.preventDefault();
    searchFunc(searchWord)
  }
  var handleBack = function(e) {
    e.preventDefault();
    searchFunc('')
  }
  return (
    <form>
      <input placeholder = 'search' type = 'text' onChange = {handleInput}></input>
      <button onClick = {handelSearch}>search</button><button onClick = {handleBack}>back</button>
    </form>
  )

}

export default Search;