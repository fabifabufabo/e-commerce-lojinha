export default {
  port: process.env.PORT || 5000,
  mongodb: {
    url: process.env.MONGODB_CONNECTION_STRING,
  },
  jwt_secret: process.env.JWT_SECRET,
};
