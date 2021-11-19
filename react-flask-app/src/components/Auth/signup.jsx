import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//import axios from 'axios';

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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export const SignUp = () => {
	const classes = useStyles();
	const [UserRegistration, setUserRegistration] = useState({
		Name: "",
		ID: "",
		Role: "",
		Password: "",
	});
	//const [records, setRecords] = useState([]);
	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setUserRegistration({ ...UserRegistration, [name]: value });
	};
	/*const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = { ...UserRegistration, id: new Date().getTime().toString() }
    console.log(newRecord);
    axios.post('http://localhost:4000/app/signup', newRecord)
      .then(res => console.log(res.data))
    //setRecords([...records])
  }*/
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete='fname'
								name='Name'
								variant='outlined'
								required
								fullWidth
								id='Name'
								label='Name'
								autoFocus
								value={UserRegistration.Name}
								onChange={handleInput}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='ID'
								label='ID'
								name='ID'
								autoComplete='ID'
								value={UserRegistration.ID}
								onChange={handleInput}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='Role'
								label='Role'
								name='Role'
								autoComplete='Role'
								value={UserRegistration.Role}
								onChange={handleInput}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='Password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								value={UserRegistration.Password}
								onChange={handleInput}
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link to={"/signin"}>Have an account? Sign in</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};
