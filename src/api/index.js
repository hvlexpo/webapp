import HTTPClient from "./http"

import Users from "./users"
import Exhibitions from "./exhibitions"
import Votes from "./votes"

class Client {
	constructor() {
		this.firebaseToken = ""

		this.do = new HTTPClient({
			host: "api.expo.sondregjellestad.space"
		})

		this.users = new Users(this)
		this.exhibitions = new Exhibitions(this)
		this.votes = new Votes(this)
	}

	token(firebaseToken) {
		this.firebaseToken = firebaseToken

		return this
	}
}

export default Client
