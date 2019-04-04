const proxy = require("http-proxy-middleware")

const hostPath = "http://localhost:8080"
const hostPathProd = "https://api.expo.sondregjellestad.space/"

module.exports = function(app) {
	app.use(proxy("/users", { target: "http://localhost:8080/" }))
	app.use(proxy("/exhibitions", { target: "http://localhost:8080/" }))
	app.use(proxy("/votes", { target: "http://localhost:8080/" }))
}
