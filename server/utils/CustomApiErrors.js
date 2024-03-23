const sendResponse = (res, success, message, data, status) => {
  res.status(status).json({
    success: success,
    message: message || 'OK!!',
    data: data || null,
  });
};

export { sendResponse };
