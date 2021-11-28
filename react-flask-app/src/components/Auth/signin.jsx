import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useHistory} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export const SignIn = props=> {
	const classes = useStyles();
	const history=useHistory();
	/*const [ID, setID] = useState("");
	const [Password, setPassword] = useState("");

	useEffect(() => {
		if (localStorage.getItem("user")) {
			window.location.href = "/";
		}
	}, []);*/
	const [UserLogin,setUserLogin]=useState({
		ID:"",
		Password:""
	});
	const handleInput=(e)=>{
		const name=e.target.name;
		const value=e.target.value;
		setUserLogin({...UserLogin,[name]:value});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const newRecord = { ...UserLogin, id: new Date().getTime().toString() }
		axios.post('http://localhost:4000/app/signin',newRecord)
		.then(res=>{
			if(res.data.status==="SUCCESS"){
				if(res.data.data[0].Role==="instructor")
				{
					history.push({
						pathname: '/instructor',
						state: {name:res.data.data[0].Name,id:res.data.data[0].ID }
					});
			}
					//window.location.href = "/instructor";
				else if(res.data.data[0].Role==="student"){
					history.push({
						pathname: '/student',
						state: {name:res.data.data[0].Name,id:res.data.data[0].ID }
					});
				}
					//window.location.href = "/student";
				}
				else{
					console.log(res.data)
				}
			
		})
	}
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component='h1' variant='h5' style={{color:"white"}}>
					Sign in
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant='filled'
						margin='normal'
						required
						fullWidth
						id='ID'
						label='ID'
						name='ID'
						autoComplete='ID'
						autoFocus
						value={UserLogin.ID}
						color="error"
						style={{background : "white", borderColor : "black", textColor : "black", borderRadius : "5px"}}
						onChange={handleInput}
					/>
					<TextField
						variant='filled'
						margin='normal'
						required
						fullWidth
						name='Password'
						label='Password'
						type='Password'
						id='Password'
						autoComplete='current-password'
						value={UserLogin.Password}
						color="error"
						style={{background : "white", borderColor : "black", textColor : "black"}}
						onChange={handleInput}
						/>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						color="secondary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link to='/' style={{color:"white"}}>
								I don't have an account.
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};
