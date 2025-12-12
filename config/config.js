const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "MyPortfolio2024SecretKey!@#$",
  mongoUri: process.env.MONGODB_URI || 'mongodb+srv://2000devp1_db_user:2U5hPcLoTLvzG5x9@portfoliobackend.oouazub.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=PortfolioBackend'
};

export default config;
