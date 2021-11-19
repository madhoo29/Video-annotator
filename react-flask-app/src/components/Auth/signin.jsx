import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

export const SignIn = () => {
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (localStorage.getItem("user")) {
			window.location.href = "/";
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		// const newRecord = { ...UserLogin, id: new Date().getTime().toString() };
		const signData = {
			email: email,
			password: password,
		};
		console.log(signData);
		axios
			.post("http://capstone.dev/api/auth/signin", signData, {
				headers: {
					"Allow-origin-access-control": "true",
				},
			})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					localStorage.setItem("user", JSON.stringify(res.data.jwt));
					window.location.href = "/";
				} else {
					alert("Invalid Credentials");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='ID'
						label='ID'
						name='ID'
						autoComplete='ID'
						autoFocus
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='Password'
						label='Password'
						type='Password'
						id='Password'
						autoComplete='current-password'
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						className={classes.submit + " button button-primary"}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to='/signup' style={{ color: "#222" }}>
								I don't have an account. Request admin
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};
