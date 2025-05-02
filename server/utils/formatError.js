function formatGrpcErrorMessage(error, fallbackMessage = "An error occurred.") {
    if (Array.isArray(error?.details)) {
      const messages = error.details
        .map(detail => detail?.message)
        .filter(msg => !!msg);
      if (messages.length > 0) {
        return messages.join('\n');
      }
    }
    return fallbackMessage;
  }
  
  module.exports = { formatGrpcErrorMessage };
  