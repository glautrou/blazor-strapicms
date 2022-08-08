module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '11e8245b45e24995e257223805514ff6'),
  },
});
