export default {
  port: process.env.PORT || 3000,
  mongodb: {
    url: process.env.MONGODB_CONNECTION_STRING,
  },
  jwt_secret: process.env.JWT_SECRET,
};
