import { Button } from '@mui/material';
import React from 'react';
import './Login.css';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';

function Login() {
	const signIn = () => {
		signInWithPopup(auth, provider)
			.then(result => {
				console.log(result);
			})
			.catch(error => {
				alert(error.message);
			});
	};

	return (
		<div className="login">
			<div className="login__logo">
				<img
					src="https://user-images.githubusercontent.com/56409227/154998230-5578251b-141e-47c3-99cd-75c8ed7a505b.png"
					alt="Discord Logo"
				/>
			</div>

			<Button onClick={signIn}>Sign in</Button>
		</div>
	);
}

export default Login;
