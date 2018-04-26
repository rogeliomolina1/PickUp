import React from 'react';
import {Link} from 'react-router-dom';
import NavBar from './NavBar';

class SignIn extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      error: {
        message: ''
      }
    }
  }

signIn(){
  console.log('this.state', this.state);
  const{email, password}=this.state;
}

  render(){
    return(
      <div className="form-inline" style={{margin:'5%'}}>
      <NavBar/>
        <h2>SignIn</h2>
        <div className="form-group">
        <input
        className="form-control"
        type="text"
        style={{marginRight:'5px'}}
        placeholder="email"
        onChange={event => this.setState({email: event.target.value})}
        />
        <input
        className="form-control"
        type="password"
        style={{marginRight:'5px'}}
        placeholder="password"
        onChange={event => this.setState({password: event.target.value})}
        />
        <button
        className="btn btn-primary"
        type="button"
        onClick={() => this.SignIn()}
        >
        Sign In
        </button>
      </div>
      <div>{this.state.error.message}</div>
      <div><Link to={'/signup'}>Sign up instead</Link></div>
    </div>
    );
  }
}

export default SignIn;
