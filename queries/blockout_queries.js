const db = require("../db/db");
const { error_code, error_messages } = require("../utills/https_messages");
const { schemaName } = require("../constants");

const status = { active: 1, deleted: 0 };

const checkBlockoutBySpotId = async (id, searchedDate, user_id = 0) => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT (dates->>'quickspot_id') as block_spot_ids,(dates->>'all') as all FROM ${schemaName}.qs_lookup_info qli,jsonb_array_elements(qli.qs_lookup_details->'dates') dates where (dates->>'startDate')::date <= $1 and (dates->>'endDate')::date >= $1`;

      if (user_id) {
        query += ` and qli.qs_lookup_key='qs_look_key${user_id}'`;
      }

      db.query(query, [searchedDate], (error, res) => {
        if (error) {
          throw error;
        } else {
          let exist = false;
          for (let i in res?.rows) {
            obj = res?.rows[i];
            if (obj.all) {
              exist = true;
            }
            let spot_id_index = obj?.block_spot_ids.indexOf(id);
            if (spot_id_index >= 0) {
              exist = true;
            }
          }
          resolve(exist);
        }
      });
    } catch (err) {
      console.log("err-saveBlockout", JSON.stringify(err));
      reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const getBlockoutData = async (searchedDate) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT (dates->>'quickspot_id') as block_spot_ids,(dates->>'all') as all,qs_lookup_key FROM ${schemaName}.qs_lookup_info qli,jsonb_array_elements(qli.qs_lookup_details->'dates') dates where qli.qs_lookup_key ilike 'qs_look_key%' and (dates->>'startDate')::date <= $1 and (dates->>'endDate')::date >= $1`;
      db.query(query, [searchedDate], (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve(res?.rows);
        }
      });
    } catch (err) {
      console.log("err-getBlockoutData", JSON.stringify(err));
      reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const getMyBlockoutDates = async (filter) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT to_char((dates->>'startDate')::date,'yyyy-mm-dd') as startDate,to_char((dates->>'endDate')::date,'yyyy-mm-dd') as endDate FROM ${schemaName}.qs_lookup_info qli,jsonb_array_elements(qli.qs_lookup_details->'dates') dates where qli.qs_lookup_key = $1 and (EXTRACT(MONTH FROM (dates->>'startDate')::date) between $2 and $3 or EXTRACT(MONTH FROM (dates->>'endDate')::date) between $2 and $3) GROUP BY DATE_TRUNC('day',(dates->>'startDate')::date),dates`;
      db.query(
        query,
        ["qs_look_key" + filter.userid, filter.preMonth, filter.postMonth],
        (error, res) => {
          if (error) {
            throw error;
          } else {
            resolve(res.rows);
          }
        }
      );
    } catch (err) {
      console.log("err-getMyBookingDates", JSON.stringify(err));
      reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

module.exports = {
  checkBlockoutBySpotId,
  getBlockoutData,
  getMyBlockoutDates,
};
