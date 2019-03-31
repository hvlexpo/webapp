import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import App from './App'
import { Provider as ContextProvider } from './contexts/AuthContext'

import './index.css'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
	<Provider store={store}>
		<ContextProvider>
			<App />
		</ContextProvider>
	</Provider>,
	document.getElementById('root')
)
