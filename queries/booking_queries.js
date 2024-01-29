const db = require("../db/db");
const { error_code, error_messages } = require("../utills/https_messages");
const { schemaName } = require("../constants");
const { reject } = require("lodash");

const status = { active: 1, deleted: 0 };

const checkAvailable = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT * FROM ${schemaName}.qs_booking qsb WHERE qsb.quickspot_id=$1 and date(qsb.slotdate)=$2 and (qsb.end_time) >=$3 and (qsb.start_time) <=$4`;
      db.query(query, data, (error, resBooking) => {
        if (error) {
          throw error;
        } else {
          resolve(resBooking?.rows);
        }
      });
    } catch (err) {
      console.log("err-checkAvailable", JSON.stringify(err));
      reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const countBookingMonthly = async (fromDate, toDate) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT
      to_char(DATE_TRUNC('month',created_on),'Mon')
        AS  month_name,
      COUNT(booking_id) AS count
FROM ${schemaName}.qs_booking where date(created_on) between $1 and $2
GROUP BY DATE_TRUNC('month',created_on) order by min(created_on);`;
      db.query(query, [fromDate, toDate], (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve(res.rows);
        }
      });
    } catch (err) {
      console.log("err-countBookingMonthly", JSON.stringify(err));
      reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const getAllBookingStatus = async () => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT * FROM ${schemaName}.qs_bookingstatus`;
      db.query(query, [], (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve(res.rows);
        }
      });
    } catch (err) {
      console.log("err-getAllBookingStatus", JSON.stringify(err));
      reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const countBooking = async () => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT COUNT(booking_id) AS count FROM ${schemaName}.qs_booking`;
      db.query(query, [], (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve(res.rows[0]);
        }
      });
    } catch (err) {
      console.log("err-countBooking", JSON.stringify(err));
      reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const countPayments = async () => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT COUNT(payment_id) AS count FROM ${schemaName}.qs_payments`;
      db.query(query, [], (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve(res.rows[0]);
        }
      });
    } catch (err) {
      console.log("err-countPayments", JSON.stringify(err));
      reject({
        code: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const getMyBookingDates = async (filter) => {
  return new Promise((resolve, reject) => {
    try {
      let quickSPotCnd = "";
      if (filter.quickspot_id.length > 0) {
        quickSPotCnd = ` or qsb.quickspot_id in (${filter.quickspot_id.join()})`;
      }
      const query = `Select ARRAY(SELECT
      to_char(DATE_TRUNC('day',slotdate),'yyyy-mm-dd')
        AS  date from ${schemaName}.qs_booking qsb where (userid=$1 ${quickSPotCnd}) and EXTRACT(MONTH FROM slotdate) between $2 and $3
GROUP BY DATE_TRUNC('day',slotdate) order by min(slotdate)) as bookingdates;`;
      db.query(
        query,
        [filter.userid, filter.preMonth, filter.postMonth],
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
  checkAvailable,
  countBookingMonthly,
  countBooking,
  countPayments,
  getAllBookingStatus,
  getMyBookingDates,
};
