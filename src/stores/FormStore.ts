import {debounce} from 'lodash';
import {action, makeObservable, observable} from "mobx";
import {SubmissionError, SubmissionErrorWithConfirm} from "../utils/errors";

export class PropertyError {
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

type SubmitCallback<T> = (data: T) => Promise<any> | any;

function dummySubmitCalBack(data: any) {
    return new Promise((resolve) => {
        console.error('SubmitCallback missing');
        setTimeout(resolve, 1000);
    });
}

export class FormStore<T extends object> {
    data: T;
    @observable errors: object = {};
    @observable message: string = "";
    @observable isSubmitting = false;
    @observable isDisabled = false;
    @observable showConfirmAlertError = true;
    onSubmitCallback: SubmitCallback<T> = dummySubmitCalBack;
    onChangeCallback?: (data: T) => any;

    constructor(data: T) {
        makeObservable(this);
        this.data = data;
    }

    _getValue(path: string[], data: any): any {
        if (path.length === 0) {
            return data;
        }

        const [name, ...rest] = path;

        if (!(name in data)) {
            throw new PropertyError(`Property '${name}' does not exist in the form.`);
        }

        return this._getValue(rest, data[name]);
    }

    getValue(name: string) {
        return this._getValue(name.split("."), this.data);
    }

    getError(name: string) {
        if (!(name in this.errors)) {
            return null;
        }
        // @ts-ignore
        return this.errors[name];
    }

    @action
    setErrors(response: any) {
        this.errors = response.errors || {};
        this.message = response.message || "";
        this.showConfirmAlertError = response.showConfirmAlert || false;
    }

    _setValue(path: string[], value: any, data: any): any {
        const [name, ...rest] = path;

        if (path.length === 1) {
            return (data[name] = value);
        }

        if (!(name in data)) {
            throw new PropertyError(`Property '${name}' does not exist in the form.`);
        }

        return this._setValue(rest, value, data[name]);
    }

    @action
    setValue(name: string, value: any) {
        this._setValue(name.split("."), value, this.data);
        if (this.onChangeCallback) {
            this.onChangeCallback(this.data);
        }
    }

    @action
    setData(data: any) {
        for (const property in this.data) {
            if (this.data.hasOwnProperty(property)) {
                this.setValue(property, data[property]);
            }
        }
    }

    onSubmit(callback: SubmitCallback<T>) {
        this.onSubmitCallback = callback;

        return this;
    }

    autoSubmit() {
        this.onChangeCallback = debounce(this.submit, 200);

        return this;
    }

    @action
    submit = async () => {
        if (this.isSubmitting) {
            return;
        }

        this.setIsSubmitting(true);

        this.setErrors({
            errors: [],
            message: '',
            showConfirmAlertError: false,
        });

        let success = true;

        try {
            await this.onSubmitCallback(this.data);
            this.setIsSubmitting(false);
        } catch (error) {
            this.setIsSubmitting(false);
            success = false;

            if (error instanceof SubmissionErrorWithConfirm) {
                this.setErrors(error);
            }
            if (error instanceof SubmissionError) {
                this.setErrors(error);
            } else {
                throw error;
            }
        }

        return success;
    };

    @action
    setIsSubmitting = (isSubmitting: boolean) => this.isSubmitting = isSubmitting;
}
