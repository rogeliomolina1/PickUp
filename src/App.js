import React from 'react';
import './App.css';

export class App extends React.Component {
handleSubmit(){
  <h1>{this._input.value}</h1>
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="./logo.png" className="App-logo" alt="logo" />
          <h1 className="App-title">The Hub for Connecting Players</h1>
        </header>
        <h3 className="App-newGame">
          To setup a pickup game please enter the required information below
        </h3>

      <section className="SubmissionHome">
        <form
         className="form-inline"
         role="form"
         onSubmit={this.handleSubmit}
       >
          <input
             type="text"
             id="sport"
             placeHolder="Activity"/>

          <input
             type="text"
             id="name"
             placeHolder="Name"/>
          <input
             type="text"
             id="location"
             placeHolder="Location"/>
           <div>
             <input type="submit" value="Submit"/>
           </div>
        </form>
      </section>
      <div>  <CurrentGames/> </div>
      </div>
    );
  }
}

class CurrentGames extends React.Component{
  render(){
    return(
      <h3 className="App-curentGames" margin>
        Below are the currently scheduled games
      </h3>

    );
  }
}
