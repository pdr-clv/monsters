import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import {SearchBox} from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters:[],
      searchField:''
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>response.json())
    .then(user=>this.setState({monsters:user}));
  }

  // definimos la función handleChange, y para que 'this' siga representando la clase APP, se tiene que hacer con función flecha, sino, habría que hacer un enlace de this (this binding) en el constructor.
  handleChange = e => this.setState({searchField:e.target.value});

  render() {
    //usamos concepto D structuring, se coge propiedades de un objeto y se asignan a constantes, como a continuación.
    const {monsters,searchField}= this.state; 
    // esta expresión equivale a
    //const monsters = this.state.monsters;
    //const searchField = this.state.searhField; pero se utiliza la que no está comentada para ahorrar escritura, tiempo y espacio.
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className='App'>
      <h1>Amazing Monsters</h1>
      <h2>by Pedro Calvo</h2>
      <SearchBox 
        placeholder='Search your monster' 
        handleChange = {this.handleChange}
        />
      <CardList monsters = {filteredMonsters} />
      </div>
    );
  }
}


export default App;
