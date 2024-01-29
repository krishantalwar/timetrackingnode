const schemaName = 'spot';
const useridSeqNo = `${schemaName}.qs_user_userid_seq`;
const userType = {
    user: "qs_user",
    admin: "qs_admin"
}

module.exports = {
    schemaName,
    useridSeqNo,
    userType
}