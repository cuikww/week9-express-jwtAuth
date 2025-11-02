const logger = (req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.originalUrl}`);
  next();
};

export default logger;
