export class ValidationError extends Error {
    constructor(statusCode: number, message: string) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = statusCode;
        this.details = [message];
    }

    public statusCode: number;
    public details: string[];
}
