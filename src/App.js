import React from 'react';
import './App.css';

export let games = [{
  id: 1,
  sport: 'Soccer',
  name: 'Rogelio',
  location: 'Livermore'
},{
  id: 2,
  sport: 'Basketball',
  name: 'Tim',
  location: 'Pleasanton'
},{
  id: 3,
  sport: 'Surfing',
  name: 'Brad',
  location: 'Santa Cruz'
}];

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="/logo.png" className="App-logo" alt="logo" />
          <h1 className="App-title">The Hub for Connecting Players</h1>
        </header>
        <h1 className="App-newGame">
          To setup a pickup game please enter the required information below
        </h1>

      <section className="SubmissionHome">
<CurrentGames games={this.props.games}/>
        </section>
      </div>
    );
  }
}

class CurrentGames extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      search: '',
      games: props.games
    };
  }

updateSearch(event){
  this.setState({search: event.target.value});
}

addGame(event) {
  event.preventDefault();
  let sport = this.refs.sport.value;
  let name = this.refs.name.value;
  let location = this.refs.location.value;
  let id = Math.floor((Math.random()*100)+1);
  this.setState({
    games: this.state.games.concat({id, sport, name, location})
  })
  this.refs.sport.value='';
  this.refs.name.value='';
  this.refs.location.value='';
}

  render(){
    let filteredGames = this.props.games.filter(
      (game) => {
        return ((game.sport.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)||
          (game.name.toLowerCase().indexOf(this.state.search.toLowerCase())!== -1)||
          (game.location.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1));
      }
    );
    return(
      <div>

        <form
         className="form-inline"
         onSubmit={this.addGame.bind(this)}
       >
            <input
              type="text"
              ref="sport"
              placeholder="Activity"/>
            <input
              type="text"
              ref="name"
              placeholder="Name"/>
           <input
              type="text"
              ref="location"
              placeholder="Location"/>

            <div className="App-submitButton">
              <input type="submit" value="Submit"/>
            </div>

          </form>

        <input type="text" placeholder="Search"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}/>


      <ul>
          {filteredGames.map((game)=>{
            return <Game game = {game} key={game.id}/>
          })}
      </ul>
    </div>
    );
  }
}

class Game extends React.Component{
  render(){
    return(
      <li>
      {this.props.game.sport} {this.props.game.name} {this.props.game.location}
          </li>
    );
  }
}
