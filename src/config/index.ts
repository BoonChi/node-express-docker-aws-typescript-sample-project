const config = {
    PORT: process.env.PORT || 8990,
    url: process.env.URL || 'http://localhost',
    mongoDB : {
        user: process.env.MONGO_USER || 'mongoUser',
        password: process.env.MONGO_PASSWORD || 'pass123456',
        host: process.env.MONGO_HOST || 'localhost',
        port: process.env.MONGO_PORT || '5432',
    },
    defaultAvatar: "public/avatar.png",
    s3 : {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "fakeValue",
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "fakeValue",
        region: process.env.AWS_REGION || "fakeValue",
        bucket : process.env.AWS_BUCKET || "fakeValue",
    },
    imageDir: "upload"
}

const configs = Object.freeze(config)

export {configs};