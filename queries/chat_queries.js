const db = require("../db/db");
const { error_code, error_messages } = require("../utills/https_messages");
const { schemaName } = require("../constants");

const getOne2OneNode = async (spot_id) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT * FROM ${schemaName}.qs_message_node as message_node WHERE spot_id=$1 order by qs_node_id desc`;
      db.query(query, [spot_id], (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve(res.rows);
        }
      });
    } catch (err) {
      console.log("err-getOne2OneNode", JSON.stringify(err));
      reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

module.exports = {
  getOne2OneNode,
};
