import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import Login from './Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from './firebase';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/userSlice';

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const auth = getAuth(firebaseApp);

	useEffect(() => {
		onAuthStateChanged(auth, authUser => {
			console.log('user is', authUser);
			if (authUser) {
				// the user is logged in
				dispatch(
					login({
						uid: authUser.uid,
						photo: authUser.photoURL,
						email: authUser.email,
						displayName: authUser.displayName
					})
				);
			} else {
				// the user is logged out
				dispatch(logout());
			}
		});
	}, [dispatch]);
	return (
		<div className="app">
			{user ? (
				<>
					<Sidebar />
					<Chat />
				</>
			) : (
				<Login />
			)}
		</div>
	);
}

export default App;
