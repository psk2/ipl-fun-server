if (process.env.NODE_ENV === "production") {
    module.exports = { mongoURI: "mongodb://psk:root@ds131698.mlab.com:31698/rest-shop" }
} else {
    module.exports = { mongoURI: "mongodb://localhost/ipl-fun-server" }
}