const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGOOSE_URI || "mongodb://localhost:27017/clothesstore"
    }
};


module.exports=config;