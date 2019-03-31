class Users {
	constructor(client) {
		this.client = client

		this.basePath = "/users"
	}

	async getCurrentUser() {
		return {
			name: "Sebastian"
		}
	}
}

export default Users
