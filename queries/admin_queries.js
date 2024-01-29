const db = require('../db/db');
const { error_code, error_messages } = require('../utills/https_messages');
const { schemaName,useridSeqNo, userType } = require('../constants')

const fetchAdminDataWithEmailAndPassword = async (email, password) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT * FROM ${schemaName}.qs_user  WHERE email = $1 AND PASSWORD= $2 AND user_type=$3 `;
            db.query(query, [email, password, userType.admin], (error, res) => {
                if (error) {
                    throw (error);
                } else {
                    resolve({ data: res.rows })
                }
            });
        } catch (err) {
            console.log('err-fetchUserDataWithEmail', JSON.stringify(err))
            reject({ code: error_code.serverSideError, message: error_messages.db_issue, err })
        }
    })
};

const fetchAdminDataWithEmail = async (email) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT * FROM ${schemaName}.qs_user  WHERE email = $1 AND user_type = $2`;
            db.query(query, [email, userType.admin], (error, res) => {
                if (error) {
                    throw (error);
                } else {
                    resolve({ data: res.rows })
                }
            });
        } catch (err) {
            console.log('err-fetchUserDataWithEmail', JSON.stringify(err))
            reject({ code: error_code.serverSideError, message: error_messages.db_issue, err })
        }
    })
};

const fetchAdminDataWithId = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT * FROM ${schemaName}.qs_user  WHERE userid = $1 AND user_type = $2`;
            db.query(query, [id,userType.admin], (error, res) => {
                if (error) {
                    throw (error);
                } else {
                    resolve({ data: res.rows })
                }
            });
        } catch (err) {
            console.log('err-fetchUserDataWithId', JSON.stringify(err))
            reject({ code: error_code.serverSideError, message: error_messages.db_issue, err })
        }
    })
};

module.exports = {
    fetchAdminDataWithEmailAndPassword,
    fetchAdminDataWithEmail,
    fetchAdminDataWithId
}