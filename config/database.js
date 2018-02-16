if (process.env.NODE_ENV === "production") {
    module.exports = { mongoURI: "mongodb://psk:root@ds239128.mlab.com:39128/ipl-fun-server" }
} else {
    module.exports = { mongoURI: "mongodb://localhost/ipl-fun-server" }
}