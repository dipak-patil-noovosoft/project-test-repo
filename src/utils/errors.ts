export class FullPageError {
    public message: string;
    constructor(message: string) {
        this.message = message;
    }
}

export class NotFoundError extends FullPageError {}

export class UnauthorisedError {
    constructor() {
        window.location.href = "/login";
    }
}

export class FlashError {
    message: string = '';
    constructor(message: any) {
        this.message = message;
    }
}

export class ServerError extends FlashError {}

export class SubmissionError extends FlashError {
    errors: object;
    constructor(message: string, errors: object) {
        super(message);
        this.errors = errors;
    }
}

export class SubmissionErrorWithConfirm extends FlashError {
    errors: object;
    showConfirmAlert: boolean;

    constructor(response: any, errors: object) {
        super(response.data.message);
        this.errors = errors;
        this.showConfirmAlert = response.data.showConfirmAlert;
    }
}
