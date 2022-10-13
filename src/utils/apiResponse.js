module.exports = {
    makeResponseSuccess: (data, status, message = "SUCCESS") => ({
        message: message,
        status: status,
        data: data,
    }),
    makeResponseFail: (status, message = "FAIL") => ({
        message: message,
        status: status,
    })
}
