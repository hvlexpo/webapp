const proxy = require("http-proxy-middleware")

let hostPath
if (process.env.NODE_ENV === 'production') {
	hostPath = "https://api.expo.sondregjellestad.space/"
} else {
	hostPath = "http://localhost:8080/"
}

module.exports = function(app) {
	app.use(proxy("/users", { target: hostPath }))
	app.use(proxy("/exhibitions", { target: hostPath }))
	app.use(proxy("/votes", { target: hostPath}))
}
