export abstract class CodedError extends Error {
  code: string;
  details?: Record<string, any>;
  statusCode?: number;

  constructor(
    code: string,
    message: string,
    statusCode?: number,
    details?: Record<string, any>
  ) {
    super(message);
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      details: this.details,
    };
  }
}
