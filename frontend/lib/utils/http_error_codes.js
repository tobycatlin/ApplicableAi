const httpErrorCodes = {
  400: {
    error: "Bad Request",
    explanation: "The server cannot process the request due to invalid syntax.",
  },
  401: {
    error: "Unauthorized",
    explanation:
      "The request lacks valid authentication credentials for the target resource.",
  },
  403: {
    error: "Forbidden",
    explanation:
      "The server understood the request but refuses to authorize it.",
  },
  404: {
    error: "Not Found",
    explanation: "The server cannot find the requested resource.",
  },
  500: {
    error: "Internal Server Error",
    explanation:
      "The server encountered an unexpected condition that prevented it from fulfilling the request.",
  },
  502: {
    error: "Bad Gateway",
    explanation:
      "The server received an invalid response from an upstream server.",
  },
  503: {
    error: "Service Unavailable",
    explanation:
      "The server is currently unable to handle the request due to temporary overloading or maintenance.",
  },
  504: {
    error: "Gateway Timeout",
    explanation:
      "The server did not receive a timely response from an upstream server.",
  },
};

export default httpErrorCodes;
