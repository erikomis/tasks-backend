class ErrorsApp {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ErrorsApp;
