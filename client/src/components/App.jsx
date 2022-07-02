import React, { Component } from 'react';
import AddBar from './AddBar.jsx';
import SingleWord from './SingleWord.jsx';
import axios from 'axios';
import Search from './Search.jsx';
import ChooseDisplay from './ChooseDisplay.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
      modelMode: false,
      shuffleList: []
    }
    this.addWord = this.addWord.bind(this);
    this.addDefination = this.addDefination.bind(this);
    this.fetchWordList = this.fetchWordList.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.saveWordList = this.saveWordList.bind(this);
    this.deleteWord = this.deleteWord.bind(this);
    this.deleteWordDb = this.deleteWordDb.bind(this);
    this.setModelView = this.setModelView.bind(this);
    this.setShuffleList = this.setShuffleList.bind(this);
  }

  componentDidMount() {
    this.fetchWordList('')
  }

  setShuffleList(wordList) {
    this.setState({
      shuffleList:wordList
    })
  }

  setModelView() {
    if (this.state.modelMode) {
      this.fetchWordList('')
    }
    this.setState({
      modelMode: !this.state.modelMode
    })
  }

  deleteWord(wordObj) {
    var list = this.state.wordList;
    var newList = list.filter(function(word) {
      return word.word !== wordObj.word;
      })

    this.setState({
      wordList: newList,
      shuffleList: newList
    })

    this.deleteWordDb(wordObj)
  }

  deleteWordDb(wordObj) {
    axios.post('/delete', wordObj)
  }

  fetchWordList(query) {
    axios.get('/dic?word=' + query)
    .then((res) => {
      this.setState({
        wordList: res.data.reverse(),
        shuffleList:res.data.reverse()
      })
    })
    .catch(err => {
      throw(err)
    })
  }

  saveWordList(wordObj) {
    axios.post('/dic', wordObj)
  }

  addWord(word) {
    var wordObj = {word: word, defination: null};
    var newList = this.state.wordList;
    newList.unshift(wordObj);
    this.setState({
      wordList: newList,
      shuffleList: newList
    })
    this.saveWordList(wordObj);
  }

  addDefination(word, defination) {
    var newWordList = this.state.wordList
    for (var singleWord of newWordList) {
      if (singleWord.word === word) {
        singleWord.defination = defination;
        break
      }
    }
    this.setState({
      wordList: newWordList,
      shuffleList: newWordList
    })
    this.saveWordList({word, defination})
  }

  render() {
    return (
      <div className={this.state.modelMode? 'modal': null}>
        <AddBar addFunc = {this.addWord}/>
        <Search searchFunc = {this.fetchWordList}/>
        <ChooseDisplay mode = {this.state.modelMode} changeModeFunc = {this.setModelView} wordList = {this.state.shuffleList} changeWordListFunc = {this.setShuffleList}/>
        <div className = 'wordList'>
          {this.state.wordList.map((singleWord) => {
            return <SingleWord key = {singleWord.word} singleWord = {singleWord} addDefFunc = {this.addDefination} deleteFunc = {this.deleteWord}/>
          })}
        </div>


      </div>
    )


  }
}

export default App;