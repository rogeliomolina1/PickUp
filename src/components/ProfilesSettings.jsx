var React=require("react");
var ReactDOM=require("react-dom");
require("../css/profiles.css");
var {Switch,BrowserRouter,Route,browserHistory,Redirect}=require('react-router-dom');
var axios=require("axios");


class ProfileSettings extends React.Component{
	constructor(props){
		super(props);
    this.profile=this.profile.bind(this);
    this.edit=this.edit.bind(this);
    this.changeEmailPrompt=this.changeEmailPrompt.bind(this);
    this.changePasswordPrompt=this.changePasswordPrompt.bind(this);
    this.changeEmail=this.changeEmail.bind(this);
    this.changePassword=this.changePassword.bind(this);
    this.state={
      emailPrompt:[],
      passwordPrompt:[],
      emailError:"",
      passwordError:"",
      newEmail:"",
      oldPassword:"",
      newPassword:"",
      showEmailBox:[],
      showPasswordBox:[]
    }
	}
  componentDidMount(){
    this.setState({
      showEmailBox:[
        <button key="changeEmailPrompt" onClick={this.changeEmailPrompt}>
          change email
        </button>
      ],
      showPasswordBox:[
        <button key="changePasswordPrompt" onClick={this.changePasswordPrompt}>
        change password
        </button>
      ]
    })
  }
  profile(){
    this.props.history.push("/user:"+this.props.username);
  }
  edit(){
    this.props.history.push("/edit:"+this.props.username);
  }
  changeEmailPrompt(){
  //  this.refs.changeemail.setAttribute("disabled","disabled");
    this.setState({showEmailBox:[]});
    axios({
      method:"post",
      url:"/getemail",
      data:{
        user:localStorage.getItem("user")
      }
    }).then((res)=>{
      this.setState({
        emailPrompt:[
          <div id="emailprompt" key="emailprompt">
            Your current email:{res.data}<br></br>
            New email:
            <input
              id="setemail"
              onChange={event => this.setState({newEmail: event.target.value})}>
            </input>
            <button
              key="changeEmailButton"
              onClick={()=>this.changeEmail(this.state.newEmail)}>
              save
            </button>
          </div>
        ]
      })
    //  this.refs.changeemail.removeAttribute("disabled");
    })
  }
  changePasswordPrompt(){
  //  this.refs.changepassword.setAttribute("disabled","disabled");
    this.setState({
      showPasswordPrompt:[],
      passwordPrompt:[
        <div id="passwordprompt" key="passwordprompt">
          Current password:
          <input type="password"
            id="oldpassword"
            onChange={event => this.setState({oldPassword: event.target.value})}>
          </input>
          <br></br>
          New password:
          <input type="password"
            id="newpassword"
            onChange={event => this.setState({newPassword: event.target.value})}>
          </input>
          <button
            key="changePasswordButton"
            onClick={()=>this.changePassword(this.state.oldPassword,this.state.newPassword)}>
            save
          </button>
        </div>
      ]
    })
  //  this.refs.changepassword.removeAttribute("disabled");
  }
  changeEmail(newemail){
    //this.refs.changeEmailButton.setAttribute("disabled","disabled");
    if(newemail.match(/.*@.*/)==null){
      this.setState({emailError:"invalid email"})
    }
    else{
      axios({
        method:"post",
        url:"/setemail",
        data:{
          user:localStorage.getItem("user"),
          email:newemail
        }
      }).then((res)=>{
        this.setState({
          emailError:res.data,
          emailPrompt:[],
          newEmail:"",
          showEmailBox:[
            <button key="changeEmailPrompt" onClick={this.changeEmailPrompt}>
              change email
            </button>
          ]
        })

        //this.refs.changeEmailButton.removeAttribute("disabled");
      })
    }
  }
  changePassword(oldPassword,newPassword){
    if(newPassword.length<8){
      this.setState({passwordError:"password must be 8 characters long"})
    }
    else{
      axios({
        method:"post",
        url:"/setpassword",
        data:{
          user:localStorage.getItem("user"),
          oldPassword:oldPassword,
          newPassword:newPassword
        }
      }).then((res)=>{
        this.setState({
          passwordError:res.data,
          passwordPrompt:[],
          oldPassword:"",
          newPassword:"",
          showPasswordBox:[
            <button key="changePasswordPrompt" onClick={this.changePasswordPrompt}>
            change password
            </button>
          ]
        })
        //this.refs.changeEmailButton.removeAttribute("disabled");
      })
    }

  }
	render(){
		return(
			<div id="profile">
				<div id="panel">
          <div id="profile">
            <button onClick={this.profile}>
              profile
            </button>
          </div>
          <div id="edit">
            <button onClick={this.edit}>
              edit
            </button>
          </div>
          <div id="changeemailbox">
            {this.state.showEmailBox}
            <div id="emailbox" ref="emailbox">
              {this.state.emailPrompt}
              {this.state.emailError}
            </div>
          </div>
          <div id="changepasswordbox">
            {this.state.showPasswordBox}
            <div id="passwordbox" ref="passwordbox">
              {this.state.passwordPrompt}
              {this.state.passwordError}
            </div>
          </div>



				</div>
			</div>
			);
	}
};



module.exports={
	ProfileSettings,
}
