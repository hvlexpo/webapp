import firebase from 'firebase'

const config = {
	apiKey: 'AIzaSyB9cjEEfM-8GHB5H0NVUsb8dZ031hA0TAk',
	authDomain: 'hvl-expo.firebaseapp.com',
	databaseURL: 'https://hvl-expo.firebaseio.com',
	projectId: 'hvl-expo',
	storageBucket: 'hvl-expo.appspot.com',
	messagingSenderId: '54626777503'
}

firebase.initializeApp(config)

export default firebase
