export abstract class CodedError extends Error {
  code: string;
  status: number;
  details?: Record<string, any>;

  constructor(
    code: string,
    message: string,
    status: number,
    details?: Record<string, any>
  ) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      status: this.status,
      details: this.details,
    };
  }
}

export class BadRequest extends CodedError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 400, details);
  }
}
