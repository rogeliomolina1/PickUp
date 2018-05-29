var React=require("react");
var ReactDOM=require("react-dom");
require("../css/profiles.css");
var axios=require("axios");
var {Link}=require('react-router-dom');


class Profile extends React.Component{
	constructor(props){
		super(props);
		console.log("USER",this.props.user);
		this.expandBio=this.expandBio.bind(this);
		this.addFriend=this.addFriend.bind(this);


        var usrnm=this.props.username;
		while(!(/[a-z]/i.test(usrnm[0]))){
			usrnm=usrnm.substring(1,usrnm.length);
		}

		this.state={
			expname:"Expand",
			frname:"",
			expanded:false,
			pic:"",
			short:"",
			long:"",
			username:usrnm,
			alias:"",
			email:"",
			games:[],
			friends:[],
			feed:[],
            myGames:[]
		}
	}
	expandBio(){
		if(this.state.expanded==false){
			this.setState({expanded:true});
			this.setState({expname:"Collapse"});
		}
		else{
			this.setState({expanded:false});
			this.setState({expname:"Expand"});
		}
	}
	addFriend(){
		if(this.state.frname=="Pending Request"||this.state.frname=="Friends"){
			alert("you already sent a friend request");
		}
		else{
			/*https://stackoverflow.com/questions/35315872/reactjs-prevent-multiple-times-
			button-press?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa*/
			this.refs.addfriend.setAttribute("disabled","disabled");
			axios({
				method:"post",
				url:"/reqfriend",
				data:{
					"user":this.props.user,
					"friend":this.state.username,
				}
			}).then(()=>{
				this.setState({frname:"Pending Request"});
				this.refs.addfriend.removeAttribute("disabled");
			})
		}
	}

	componentDidMount(){

		console.log(this.state.username);
		axios.post("/user",{
				user:this.state.username
		}).then((res)=>{
			var userStates=res.data[0];
			this.setState({
				username:userStates["username"],
				pic:userStates["pic"],
				alias:userStates["alias"],
				long:userStates["bio"],
				short:userStates["bio"],
				email:userStates["email"],
				games:userStates["games"],
				friends:userStates["friends"],
				feed:userStates["feed"]
			});
			//make bio shorter
	      	if(this.state.long.length>100){
	      		this.setState({short:this.state.long.substring(0,100)});
	      	}
	      	//if not friend, frname = add friend
	      	//if is friend, frname = friends
	      	//if pending friend req, frname = pending req
	      	axios({
	      		method:"post",
	      		url:"/isfriend",
	      		data:{
	      			"user":this.props.user,
	      			"friend":this.state.username
	      		}
	      	}).then((res)=>{
	      		if(res.data=="pending"){
	      			this.setState({frname:"Pending Request"});
	      		}
	      		else if(res.data=="accepted"){
	      			this.setState({frname:"Friends"});
	      		}
	      		else{
	      			this.setState({frname:"Add Friend"});
	      		}
	      	})

		}).catch((error)=>{
         	console.log(error.response.data);
      	});

	}


    componentWillMount() {
        axios.post("/usergames", {user:this.props.username}).then( (results) => {
            this.setState({myGames : results.data});
        });
    }

	gamesList(){
		if(this.state.games==undefined){return}
		const gamesList=this.state.games.map((games)=>
			<li  className="list-group-item" key={games["game"]}>{games["game"]}</li>
		)
		return(
			<ul className="list-group" key="gamesList">
{gamesList}
</ul>
		)
	}

	friendsList(){
		if(this.state.friends==undefined){return}
		var friends=this.state.friends.filter(
			friend=>friend["req"]=="accepted"
		);
		friends=friends.map((f)=>
			<li className="list-group-item" key={f["username"]}>{f["username"]}</li>
		)
		return(
			<ul className="list-group" key="friends">
  {friends}
</ul>
		)
	}
	feed(){
		if(this.state.feed==undefined){return}
		const feed=this.state.feed.map((f)=>
			<li  className="list-group-item" key={f["type"]}>{f["type"]}</li>
		)
		return(
			<ul className="list-group" key="feed">
  {feed}
</ul>
		)
	}
	componentDidUpdate(prevProps,prevState){
		if(this.state.expanded==true && this.state.expanded!=prevState.expanded)
			this.refs.bio.innerHTML=this.state.long;
		if(this.state.expanded==false && this.state.expanded!=prevState.expanded)
			this.refs.bio.innerHTML=this.state.short;

	}
	render(){
		const picStyle={
			"maxWidth":"200px",
			"maxHeight":"200px"
		}
		return(
			<div id="profile">
				<div id="panel">
					<div id="addfriend">
						<button ref="addfriend"
							className="btn btn-info"
							onClick={this.addFriend}>
							{this.state.frname}
						</button>
					</div>
					<div id="picture" >
						<img src={this.state.pic} style={picStyle}></img>
						<div id="mask"></div>
						<p id="changeimg">change picture</p>
					</div>
					<div id="username">
						{this.state.username}
					</div>
					<div id="email">
						{this.state.email}
					</div>
					<div id="alias">
						{this.state.alias}
					</div>
					<div id="bio" ref="bio">
						{this.state.short}
					</div>
					<div id="Expand">
						<button
							className="btn btn-secondary"
							onClick={this.expandBio}>
							{this.state.expname}
						</button>
					</div>
                    <GamesList games={this.state.myGames} user={this.props.user}
											username={this.state.username} frname={this.state.frname}/>
					<div id="friendsList">
						<h2>Friends:</h2><br></br>
						{this.friendsList()}
					</div>
				</div>
				<div id="fpanel">
					<h1>FEED</h1>
					<div id="feed">
						{this.feed()}
					</div>
				</div>
			</div>
			);
	}
};

class GamesList extends React.Component
{
		constructor(props){
			super(props);
			this.joinGame=this.joinGame.bind(this);
		}
		joinGame(game)
		{
		  axios.post('/join', {uid:this.props.user, gid:game.id});
		}
    displayGame(game)
    {
			if(game["isprivate"]==false){
        return(
					<tr key={game.id}>
	          <td >{game.sport}</td>
	          <td >{game.name}</td>
	          <td >{game.location}</td>
	          <td><Link to={"/game:"+game.id}>Details</Link></td>
	        </tr>
        );
			}
			else{
				return(
					<tr key={"p"+game.id}>
	          <td >{game.sport}</td>
	          <td >{game.name}</td>
	          <td >private game, cannot view location</td>
	          <td>private game, cannot view details</td>
	        </tr>
        );
			}
    }
		displayGamesMade(game)
    {
			if(game["isprivate"]==false){
        return(
					<tr key={game.id}>
	          <td >{game.sport}</td>
	          <td >{game.name}</td>
	          <td >{game.location}</td>
						<td><button className="btn btn-success"
							onClick={()=>{this.joinGame(game)}}>Join</button></td>
	          <td><Link to={"/game:"+game.id}>Details</Link></td>
	        </tr>
        );
			}
			else if(game["isprivate"]==true&&this.props.frname=="Friends"){
				return(
					<tr key={"p"+game.id}>
						<td >{game.sport}</td>
						<td >{game.name}</td>
						<td >{game.location}</td>
						<td><button className="btn btn-success"
							onClick={()=>{this.joinGame(game)}}>Join</button></td>
	          <td><Link to={"/game:"+game.id}>Details</Link></td>
					</tr>
				);
			}
			else{
				return(
					<tr key={"p"+game.id}>
	          <td >{game.sport}</td>
	          <td >{game.name}</td>
						<td>private game, cannot join</td>
	          <td >private game, cannot view location</td>
	          <td>private game, cannot view details</td>
	        </tr>
        );
			}
    }


    render()
    {
        if (this.props.games==[]) return;
				var gamesList = this.props.games.filter((game)=>{
					{return game["owner"]!=this.props.username}
				})
        gamesList = gamesList.map((game) =>
            {return this.displayGame(game)}
        );
				var gamesMade = this.props.games.filter((game)=>{
					{return game["owner"]==this.props.username}
				})
				gamesMade = gamesMade.map((game) =>
            {return this.displayGamesMade(game)}
        );

        return (
            <div>
                <h2>Games Played</h2>
                <table className = "table table-bordered table-hover">
									<tbody key="gamesList">{gamesList}</tbody></table>
								<h2>Games Made</h2>
								<table className = "table table-bordered table-hover">
									<tbody key="gamesMadeList">{gamesMade}</tbody></table>

            </div>
        );

    }

}


module.exports={
	Profile
}
