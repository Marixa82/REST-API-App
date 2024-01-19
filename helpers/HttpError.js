const messageList = {
    400: "Missing required name field",
    401: "Unauthorized",
    403: "Firbidden",
    404: "Not Found",
    409: "Conflict"
}
const HttpError = (status, message = messageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}
export default HttpError;