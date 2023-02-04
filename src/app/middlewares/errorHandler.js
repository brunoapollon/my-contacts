module.exports = function errorHandler(error, request, response, next) {
  console.log('errorHandler:', error);
  response.sendStatus(500);
};
