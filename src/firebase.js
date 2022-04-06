import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBp3n6W7fFMX0TnWLB-bAjoe4pHco4LkAQ',
	authDomain: 'discord-clone-yt-5fbd0.firebaseapp.com',
	projectId: 'discord-clone-yt-5fbd0',
	storageBucket: 'discord-clone-yt-5fbd0.appspot.com',
	messagingSenderId: '205391074608',
	appId: '1:205391074608:web:ad247ea8731e3638c8e4f5',
	measurementId: 'G-J4EN7QP3BK'
};

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
