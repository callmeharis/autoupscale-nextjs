import { FormikInterface } from "./formik";

interface AjaxError extends Error {
    response?: {
        data?: string | ValidatorError | InternalError | InternalErrorMessage
    }
}

interface ValidatorError {
    data?: any;
    message: string | string[];
}

function isRequestValidatorError(obj: unknown): obj is ValidatorError {
    return Object.prototype.hasOwnProperty.call(obj, "data")
        && Object.prototype.hasOwnProperty.call(obj, "message");
}

interface InternalError {
    [key: string | number]: string | InternalErrorMessage | InternalError;
}

interface InternalErrorMessage {
    context?: {
        [key: string]: any;
    };
    error?: string;
}

/**
 * The function handles global AJAX errors and displays error messages using Toast and Formik.
 * @param {AjaxError} error - The error object that was caught by the global Ajax error handler. It is
 * of type AjaxError, which is a custom error type used in the application's Ajax requests.
 * @param interfaces - The `interfaces` parameter is an object that contains optional properties used
 * by the `globalAjaxExceptionHandler` function. It can contain the following properties:
 * @returns The function `globalAjaxExceptionHandler` returns a boolean value. It returns `true` if the
 * error is handled via toast or if there is no error, and `false` if the error is not handled.
 */
function globalAjaxExceptionHandler(
    error: AjaxError,
    interfaces: {
        formik?: FormikInterface<any>,
        defaultMessage?: string,
        toast?: any
    }
) {
    if (!error) return true;

    const { formik, toast, defaultMessage } = interfaces;
    const { response } = error;
    const data = response?.data;
    console.error(`globalAjaxExceptionHandler: encountered - `, response, error);

    if (data) {
        switch (typeof data) {
            case "string": {
                if (toast) {
                    toast?.error(data);
                    return true; // we consider this safely handled via toast
                }
            }
            case "object": {
                const validatorObj = data
                if (isRequestValidatorError(validatorObj)) {
                    const { message, data } = validatorObj;
                    const messages = message instanceof Array ? message : [message];

                    setFormikErrors(data)

                    if (toast) {
                        messages.forEach(v => toast.error(v));
                        return true; // we consider this safely handled via toast
                    }
                }
            }
        }
    }

    if (toast) {
        toast.error(defaultMessage || 'Something went south');
        return true; // handled via toast
    }

    return false; // unhandled

    /**
     * This function sets errors and touched state for Formik fields based on the provided errors object.
     * @param {any} errors - The `errors` parameter is an object that contains the validation errors for a
     * form. The keys of the object correspond to the names of the form fields, and the values are the
     * error messages or arrays of error messages associated with those fields.
     */
    function setFormikErrors(errors: any) {
        Object.entries(errors).every(([key, value]) => {
            const meta = formik?.getFieldMeta(key);
            if (meta) {
                const { setError, setTouched } = formik.getFieldHelpers(key);
                setError(typeof value == "string" ? value : value[0]);
                setTouched(true, false);
                return true;
            }
        })
    }
}


export {
    globalAjaxExceptionHandler
};