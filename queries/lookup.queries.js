
const db = require('../db/db');
const { schemaName } = require('../constants')


module.exports.insert = async(data) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `Select * from spot.fn_merge_lookup_info('${data}')`;
            console.log(query);
            db.query(query, (error, res) => {
                if (error) {
                    throw (error);
                } else {
                    resolve(true)
                }
            });
        } catch (err) {
            console.log('err', JSON.stringify(err))
            Promise.reject({ code: error_code.serverSideError, message: error_messages.db_issue, err })
        }
    })
}

module.exports.getAll = async(type) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `Select * from spot.fn_get_lookup_info('${type}');`;
            db.query(query, (error, res) => {
                if (error) {
                    throw (error);
                } else {
                    resolve(res.rows[0])
                }
            });
        } catch (err) {
            console.log('err', JSON.stringify(err))
            Promise.reject({ code: error_code.serverSideError, message: error_messages.db_issue, err })
        }
    })
}

module.exports.update = async(id,data) => {
    return new Promise((resolve, reject) => {
        try {

            
            const query = `Select * from spot.fn_merge_lookup_info('${data}',${id})`;
            db.query(query, (error, res) => {
                if (error) {
                    throw (error);
                } else {
                    resolve(true)
                }
            });
        } catch (err) {
            console.log('err', JSON.stringify(err))
            Promise.reject({ code: error_code.serverSideError, message: error_messages.db_issue, err })
        }
    })
}

module.exports.remove = async(id) => {
    return new Promise((resolve, reject) => {
        try {
            const query = `DELETE FROM ${schemaName}.qs_lookup_info  WHERE qs_lookup_id = ${id};`;
            db.query(query, (error, res) => {
                if (error) {
                    throw (error);
                } else {
                    resolve(true)
                }
            });
        } catch (err) {
            console.log('err', JSON.stringify(err))
            Promise.reject({ code: error_code.serverSideError, message: error_messages.db_issue, err })
        }
    })
}