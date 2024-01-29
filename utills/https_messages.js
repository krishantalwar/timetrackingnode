const error_code = {
    serverSideError: 500,
    invalidPayload: 423,
    badRequest: 400,
    unauthorized: 401,
    success: 200
}
const error_messages = {
    db_issue: "issue with db operation",
    email_exist: "Email is already exist",
    user_not_found: "User not found",
    email_or_password_Wrong: "Email or Password is incorrect",
    user_status_diasbled_message: "Please contact with Administrator.",
    error_in_reset_password: "Error while reset password",
    invalid_data: "Invalid data",
    month_empty:"Please provide month count",
    chart_type_mandatory:"Please provide valid chart type"
};
const success_messages = {
    signup_success: "Signup successfully completed",
    login_success: "Login successfully completed"
}

module.exports = {
    error_code,
    error_messages,
    success_messages
}