messages = {};

messages.generalMessage = (res,statusCode, data, state, message) => {
  res.status(statusCode).json({
    ok: state,
    data: data,
    message: message,
  });
};

module.exports = messages;
