const db = require("../db/db");
const { error_code, error_messages } = require("../utills/https_messages");
const { schemaName } = require("../constants");
const { reject } = require("lodash");

const moment = require("moment");
const { array } = require("joi");

const quickSpotStatus = { active: 1, inactive: 0 };

const fetchSpotQuery = `SELECT distinct(qms.quickspot_id) as spotid,qms.created_on as qmscreated,qms.*,qqp.*,qlit.qs_lookup_details as type_details,qlis.qs_lookup_details as style_details,qlic.qs_lookup_details as cancellation_policy FROM ${schemaName}.qs_my_quickspot qms inner join ${schemaName}.qs_quickspot_property qqp on qms.quickspot_id=qqp.quickspot_id left join ${schemaName}.qs_lookup_info qlis on qms.qs_style_id=qlis.qs_lookup_id left join ${schemaName}.qs_lookup_info qlit on qms.qs_type_id=qlit.qs_lookup_id left join ${schemaName}.qs_lookup_info qlic on qqp.cpolicy_id=qlic.qs_lookup_id `;

const updateFormStep = (formSerial, quickspot_id) => {
  // return new Promise((resolve, reject) => {
  try {
    let query = `select form_last_step from ${schemaName}.qs_my_quickspot WHERE quickspot_id = $1`;
    db.query(query, [quickspot_id], (error, res) => {
      if (error) {
        throw error;
      } else {
        if (res.rows.length > 0) {
          if (res.rows[0].form_last_step != "4") {
            let activeCnd = "";
            if (formSerial == "4") {
              activeCnd += `, staus = ${quickSpotStatus.active}`;
            }
            let query = `UPDATE ${schemaName}.qs_my_quickspot SET form_last_step = $1 ${activeCnd} WHERE quickspot_id = $2 RETURNING quickspot_id;`;
            db.query(query, [formSerial, quickspot_id], (error, resRule) => {
              if (error) {
                throw error;
              } else {
                return true;
              }
            });
          }
        }
        return true;
      }
    });
  } catch (err) {
    console.log("err-updateFormStep", JSON.stringify(err));
    return {
      status: error_code.serverSideError,
      message: error_messages.db_issue,
      err,
    };
  }
  // });
};

const saveSpot = async (data, userId) => {
  return new Promise((resolve, reject) => {
    try {
      let query, queryData, ruleQuery, ruleQueryData;
      let formSerial = data.formSerial;
      if (formSerial == 1) {
        if (data.handler != undefined) {
          if (data.handler.quickspot_id != undefined) {
            query = `UPDATE ${schemaName}.qs_my_quickspot SET qs_name = $1, qs_type_id=$2, qs_style_id=$3, qs_charges=$4, qs_address=$5, modified_on = $6, modified_by = $7 WHERE quickspot_id = '${data.handler.quickspot_id}' RETURNING quickspot_id;`;
            queryData = [
              data.basicDetails.spotTitle,
              data.basicDetails.spotCategory,
              data.basicDetails.spotStyle,
              {
                hourlyRate: data.basicDetails.hourlyRate,
                cleaningFee: data.basicDetails.cleaningFee,
                discount: data.basicDetails.discount,
                minBookingHr: data.basicDetails.minBookingHr,
                maxGuestsAllowed: data.basicDetails.maxGuestsAllowed,
                spotDescription: data.basicDetails.spotDescription,
              },
              data.address,
              new Date(),
              "backend",
            ];
          }
        } else {
          query = `INSERT into ${schemaName}.qs_my_quickspot  (qs_name, qs_type_id,qs_style_id,qs_charges,qs_address,staus,created_userid,created_by,created_on,quickspot_id)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, nextval(pg_get_serial_sequence('spot.qs_my_quickspot', 'quickspot_id'))) RETURNING quickspot_id;`;
          queryData = [
            data.basicDetails.spotTitle,
            data.basicDetails.spotCategory,
            data.basicDetails.spotStyle,
            {
              hourlyRate: data.basicDetails.hourlyRate,
              cleaningFee: data.basicDetails.cleaningFee,
              discount: data.basicDetails.discount,
              minBookingHr: data.basicDetails.minBookingHr,
              maxGuestsAllowed: data.basicDetails.maxGuestsAllowed,
              spotDescription: data.basicDetails.spotDescription,
            },
            data.address,
            quickSpotStatus.inactive,
            userId,
            "backend",
            new Date(),
          ];
        }

        // console.log(query);
        db.query(query, queryData, (error, res) => {
          if (error) {
            throw error;
          } else {
            if (data.handler != undefined) {
              if (data.handler.property_id != undefined) {
                ruleQuery = `UPDATE ${schemaName}.qs_quickspot_property SET qs_rules = $1, modified_on = $2, modified_by = $3 WHERE property_id = '${data.handler.property_id}' RETURNING property_id;`;
                ruleQueryData = [{ rules: data.rules }, new Date(), "backend"];
              }
            } else {
              ruleQuery = `INSERT into ${schemaName}.qs_quickspot_property  (quickspot_id, qs_rules,staus , created_userid,created_by,created_on,property_id)
              VALUES($1, $2, $3, $4, $5, $6, nextval(pg_get_serial_sequence('spot.qs_quickspot_property', 'property_id'))) RETURNING property_id;`;
              ruleQueryData = [
                res.rows[0].quickspot_id,
                { rules: data.rules },
                1,
                userId,
                "backend",
                new Date(),
              ];
            }

            db.query(ruleQuery, ruleQueryData, (error, resRule) => {
              if (error) {
                throw error;
              } else {
                let updateStep = updateFormStep(
                  formSerial,
                  res.rows[0].quickspot_id
                );
                let returnRes = {
                  spot_id: res.rows[0],
                  property_id: resRule.rows[0],
                };
                resolve(returnRes);
              }
            });
          }
        });
      } else if (formSerial == 2) {
        const query = `UPDATE ${schemaName}.qs_my_quickspot SET qs_images = $1, modified_on = $2, modified_by = $3 WHERE quickspot_id = '${data.handler.quickspot_id}' RETURNING quickspot_id;`;
        db.query(
          query,
          [{ images: data.images }, new Date().toISOString(), "backend"],
          (error, res) => {
            if (error) {
              throw error;
            } else {
              const query = `SELECT qs_addons FROM ${schemaName}.qs_quickspot_property WHERE quickspot_id = $1`;
              db.query(query, [data.handler.quickspot_id], (error, res) => {
                if (error) {
                  throw error;
                } else {
                  let qs_addons = {};
                  console.log(" res.rows ", res.rows);
                  if (res.rows.length && res.rows[0].qs_addons) {
                    qs_addons = res.rows[0].qs_addons;
                  }

                  qs_addons.spotpicture = data.spotpicture;
                  qs_addons.availableParking = data.availableParking;

                  const query = `UPDATE ${schemaName}.qs_quickspot_property SET qs_addons = $1, modified_on = $2, modified_by = $3 WHERE quickspot_id = '${data.handler.quickspot_id}' RETURNING quickspot_id;`;
                  db.query(
                    query,
                    [qs_addons, new Date().toISOString(), "backend"],
                    (error, res) => {
                      if (error) {
                        throw error;
                      } else {
                        let updateStep = updateFormStep(
                          formSerial,
                          res.rows[0].quickspot_id
                        );
                        resolve(true);
                      }
                    }
                  );
                }
              });
            }
          }
        );
      } else if (formSerial == 3) {
        const query = `UPDATE ${schemaName}.qs_quickspot_property SET qs_operation_hours = $1, cpolicy_id= $2 , modified_on = $3, modified_by = $4 WHERE quickspot_id = '${data.handler.quickspot_id}' RETURNING quickspot_id;`;
        db.query(
          query,
          [
            data.operation,
            data.cpolicy_id,
            new Date().toISOString(),
            "backend",
          ],
          (error, res) => {
            if (error) {
              throw error;
            } else {
              let updateStep = updateFormStep(
                formSerial,
                res.rows[0].quickspot_id
              );
              resolve(true);
            }
          }
        );
      } else if (formSerial == 4) {
        const query = `SELECT qs_addons FROM ${schemaName}.qs_quickspot_property WHERE quickspot_id = $1`;
        db.query(query, [data.handler.quickspot_id], (error, res) => {
          if (error) {
            throw error;
          } else {
            let qs_addons = res.rows[0].qs_addons;
            qs_addons.addons = data.addons;

            const query = `UPDATE ${schemaName}.qs_quickspot_property SET qs_amenities = $1,  qs_addons=$2 , modified_on = $3, modified_by = $4 WHERE quickspot_id = '${data.handler.quickspot_id}' RETURNING quickspot_id;`;
            db.query(
              query,
              [data.amenities, qs_addons, new Date().toISOString(), "backend"],
              (error, res) => {
                if (error) {
                  throw error;
                } else {
                  let updateStep = updateFormStep(
                    formSerial,
                    res.rows[0].quickspot_id
                  );
                  resolve(true);
                }
              }
            );
          }
        });
      }
    } catch (err) {
      console.log("err", JSON.stringify(err));
      Promise.reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const fetchSpotDataWithId = async (id) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `${fetchSpotQuery} where qms.quickspot_id = $1`;
      db.query(query, [id], (error, res) => {
        if (error) {
          throw error;
        } else {
          let myspots = res.rows;

          const query = `SELECT qs_lookup_id,qs_lookup_key,qs_lookup_desc,qs_lookup_details FROM ${schemaName}.qs_lookup_info WHERE qs_lookup_key='qs_amenity' and is_deleted= $1`;
          db.query(query, [false], (error, resAmen) => {
            if (error) {
              throw error;
            } else {
              let sysamen = resAmen.rows;

              let fil_spots = myspots.map((spot) => {
                let spotAmeneties = sysamen.filter((am) => {
                  if (spot.qs_amenities && spot.qs_amenities.length) {
                    let idx = spot.qs_amenities.findIndex(
                      (rank) => rank === am.qs_lookup_id
                    );
                    if (idx >= 0) {
                      return true;
                    }
                  }
                });

                return Object.assign(spot, {
                  qs_amenities_data: spotAmeneties,
                });
              });

              if (fil_spots.length > 0) {
                let updatedAmenIds = [];
                for (let i in fil_spots[0]?.qs_amenities_data) {
                  let obj = fil_spots[0]?.qs_amenities_data[i];
                  const index = fil_spots[0]?.qs_amenities.indexOf(
                    obj.qs_lookup_id
                  );
                  if (index > -1) {
                    updatedAmenIds.push(obj.qs_lookup_id);
                  }
                }
                fil_spots[0].qs_amenities = updatedAmenIds;
              }

              resolve({
                data: fil_spots,
              });
            }
          });
        }
      });
    } catch (err) {
      console.log("err-fetchSpotDataWithId", JSON.stringify(err));
      reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const fetchMySpots = async (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `${fetchSpotQuery} where qms.created_userid= $1 and qms.is_deleted=$2 order by qms.quickspot_id desc`;
      db.query(query, [userId, false], (error, res) => {
        if (error) {
          throw error;
        } else {
          let myspots = res.rows;

          const query = `SELECT qs_lookup_id,qs_lookup_key,qs_lookup_desc,qs_lookup_details FROM ${schemaName}.qs_lookup_info WHERE is_deleted= $1`;
          db.query(query, [false], (error, resAmen) => {
            if (error) {
              throw error;
            } else {
              let sysamen = resAmen.rows;

              let fil_spots = myspots.map((spot) => {
                let spotAmeneties = sysamen.filter((am) => {
                  //if (isArray(spot.qs_amenities)) {
                  if (spot.qs_amenities && spot.qs_amenities.length) {
                    let idx = spot.qs_amenities.findIndex(
                      (rank) => rank === am.qs_lookup_id
                    );
                    if (idx >= 0) {
                      return true;
                    }
                  }
                });
                return Object.assign(spot, {
                  qs_amenities_data: spotAmeneties,
                });
              });
              resolve({
                data: fil_spots,
              });
            }
          });
        }
      });
    } catch (err) {
      console.log("err-fetchMySpots", JSON.stringify(err));
      reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const deleteSpot = async (id) => {
  return new Promise((resolve, reject) => {
    try {
      let data = [true, new Date().toISOString(), "backend"];

      const query = `UPDATE ${schemaName}.qs_my_quickspot SET is_deleted = $1, modified_on = $2, modified_by = $3 WHERE quickspot_id = '${id}' RETURNING quickspot_id;`;
      db.query(query, data, (error, res) => {
        if (error) {
          throw error;
        } else {
          const query = `UPDATE ${schemaName}.qs_quickspot_property SET is_deleted = $1, modified_on = $2, modified_by = $3 WHERE quickspot_id = '${id}' RETURNING property_id;`;
          db.query(query, data, (error, res) => {
            if (error) {
              throw error;
            } else {
              resolve(true);
            }
          });
        }
      });
    } catch (err) {
      console.log("err-deleteSpot", JSON.stringify(err));
      reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const manageWishListSpot = async (data, userId) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT * FROM ${schemaName}.qs_wishlist WHERE userid= $1`;
      db.query(query, [userId], (error, res) => {
        if (error) {
          throw error;
        } else {
          let addWishQuery = "";
          if (res.rows.length > 0) {
            if (data.flag) {
              addWishQuery = `UPDATE ${schemaName}.qs_wishlist SET quickspot_id = array_append(quickspot_id,${data.quickspot_id}),modified_by  = $2,  modified_on= $3 WHERE userid = $1 RETURNING quickspot_id;`;
            } else {
              addWishQuery = `UPDATE ${schemaName}.qs_wishlist SET quickspot_id = array_remove(quickspot_id,${data.quickspot_id}),modified_by  = $2,  modified_on= $3 WHERE userid = $1 RETURNING quickspot_id;`;
            }
          } else {
            addWishQuery = `INSERT into ${schemaName}.qs_wishlist  (userid, quickspot_id,created_by,created_on,wishlist_id)
              VALUES($1, ARRAY[${data.quickspot_id}], $2, $3, nextval(pg_get_serial_sequence('spot.qs_wishlist', 'wishlist_id'))) RETURNING quickspot_id;`;
          }
          let queryData = [userId, "qs_user", new Date().toISOString()];
          db.query(addWishQuery, queryData, (error, res) => {
            if (error) {
              throw error;
            } else {
              resolve(res.rows[0].quickspot_id);
            }
          });
        }
      });
    } catch (err) {
      console.log("err-manageWishListSpot", JSON.stringify(err));
      reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const fetchWishList = async (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT * FROM ${schemaName}.qs_wishlist WHERE userid= $1`;
      db.query(query, [userId], (error, res) => {
        if (error) {
          throw error;
        } else {
          if (res.rows[0]) {
            let spotids = res.rows[0].quickspot_id;
            resolve({ wishlist: spotids });
          } else {
            resolve({ wishlist: [] });
          }
        }
      });
    } catch (err) {
      console.log("err-fetchWishListSpots", JSON.stringify(err));
      reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const fetchWishListSpots = async (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `SELECT * FROM ${schemaName}.qs_wishlist WHERE userid= $1`;
      db.query(query, [userId], (error, res) => {
        if (error) {
          throw error;
        } else {
          if (res.rows[0]) {
            let spotids = res.rows[0].quickspot_id;
            const query = `${fetchSpotQuery} where qms.staus= $1 and qms.quickspot_id = any ($2) order by qms.quickspot_id desc`;
            db.query(
              query,
              [quickSpotStatus.active, spotids],
              (error, resSpots) => {
                if (error) {
                  throw error;
                } else {
                  resolve({ data: resSpots.rows });
                }
              }
            );
          } else {
            resolve({ data: [] });
          }
        }
      });
    } catch (err) {
      console.log("err-fetchWishListSpots", JSON.stringify(err));
      reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const fetchSpots = async (data, queryData, blockedSpotIds) => {
  return new Promise((resolve, reject) => {
    try {
      let whenDateWeekCnd = "",
        whenDateCaldCnd = "",
        whenStartTimeCnd = "",
        whenEndTimeCnd = "",
        typeCnd = "",
        styleCnd = "",
        locationCnd = "",
        priceCnd = "",
        attendeesCnd = "",
        nameCnd = "",
        maxHourCnd = "",
        sortCnd = "",
        pageCnd = "",
        blockedCnd = "",
        amenitiesCnd = "",
        searchHeadingLocation = "",
        searchHeadingCatStyle = "";
      // data.order,
      let maxRecords = 10;
      let offset = 0;

      if (queryData.limit) {
        maxRecords = queryData.limit;
      }

      if (queryData.page) {
        offset = (queryData.page - 1) * maxRecords;
        pageCnd = ` limit ${maxRecords} offset ${offset}`;
      }

      if (data.sort_key && data.sort_order) {
        let sort_key = data.sort_key;
        let sortKeyCnd = "";
        if (sort_key == "price") {
          sortKeyCnd = `(qs_charges->>'hourlyRate')::INTEGER`;
        } else if (sort_key == "name") {
          sortKeyCnd = `qs_name`;
        } else if (sort_key == "date") {
          sortKeyCnd = `qmscreated`;
        } else {
          sortKeyCnd = `spotid`;
        }
        sortCnd = ` order by ${sortKeyCnd} ${data.sort_order}`;
      }

      if (data.name) {
        nameCnd = ` and (qlis.qs_lookup_details->>'title' ilike '%${data.name}%' or qlit.qs_lookup_details->>'title' ilike '%${data.name}%' or qms.qs_name ilike '%${data.name}%' or qms.qs_address->>'city' ilike '%${data.name}%' or qms.qs_address->>'streetAddress' ilike '%${data.name}%' or qms.qs_address->>'address2' like '%${data.name}%' or qms.qs_address->>'postalCode' ilike '%${data.name}%' or qms.qs_address->>'country' ilike '%${data.name}%')`;
      }

      if (data.when) {
        if (data.when.date) {
          whenDateWeekCnd = `and weeks->>'day'= lower(to_char(date '${data.when.date}', 'FMDay'))`;
          whenDateCaldCnd = ` and (cald->>'start_date')::date <= '${data.when.date}' and (cald->>'end_date')::date >= '${data.when.date}'`;
          if (blockedSpotIds.length > 0) {
            blockedCnd = `where spotid not in (${blockedSpotIds.join()})`;
          }
        }

        if (data.when.start_time) {
          whenStartTimeCnd = ` and (slots->>'start_time')::INTERVAL <='${data.when.start_time}'`;
        }

        if (data.when.end_time) {
          whenEndTimeCnd = ` and (slots->>'end_time')::INTERVAL >='${data.when.end_time}'`;
        }

        if (data.when.start_time && data.when.end_time) {
          const startTime = moment(data.when.start_time, "HH:mm");
          const endTime = moment(data.when.end_time, "HH:mm");
          const duration = moment.duration(endTime.diff(startTime));
          const hours = duration.asHours();
          // maxHourCnd = ` and (qms.qs_charges->>'minBookingHr')::FLOAT <= ${hours}`;
        }
      }

      if (data.type.length > 0) {
        typeCnd = ` and qms.qs_type_id in (${data.type.join()})`;
        searchHeadingCatStyle = `${data.type.join()} `;
      }

      if (data.style.length > 0) {
        styleCnd = ` and qms.qs_style_id in (${data.style.join()})`;
        if (data.type.length > 0) {
        } else {
          searchHeadingCatStyle = `${data.style.join()} `;
        }
      }

      if (data.amenities.length > 0) {
        amenitiesCnd = ` and qqp.qs_amenities @> ARRAY[${data.amenities}]::INTEGER[]`;
      }

      if (data.location) {
        locationCnd = ` and (qms.qs_address->>'city' ilike '%${data.location}%' or qms.qs_address->>'streetAddress' ilike '%${data.location}%' or qms.qs_address->>'address2' like '%${data.location}%' or qms.qs_address->>'postalCode' ilike '%${data.location}%' or qms.qs_address->>'country' ilike '%${data.location}%')`;
        searchHeadingLocation += ` near ${data.location}`;
      }

      if (data.price) {
        const priceArray = data.price.split("-");
        let startPrice = priceArray[0];
        let endPriceCnd = "";
        if (priceArray[1]) {
          let endPrice = priceArray[1];
          endPriceCnd = ` and (qms.qs_charges->>'hourlyRate')::INTEGER <= ${endPrice}`;
        }
        priceCnd = ` and (qms.qs_charges->>'hourlyRate')::INTEGER >= ${startPrice} ${endPriceCnd} `;
      }

      if (data.attendees) {
        const attendeesArray = data.attendees.split("-");
        let startAttendees = attendeesArray[0];
        let endAttendeesCnd = "";
        if (attendeesArray[1]) {
          let endAttendees = attendeesArray[1];
          endAttendeesCnd = `and (qms.qs_charges->>'maxGuestsAllowed')::INTEGER <= ${endAttendees}`;
        }
        attendeesCnd = ` and (qms.qs_charges->>'maxGuestsAllowed')::INTEGER >= ${startAttendees} ${endAttendeesCnd} `;
      }

      let commonQuery = `select * from (${fetchSpotQuery} WHERE  qms.staus= $1 and qms.form_last_step=4 and qqp.qs_operation_hours->'everyday' is not null and qqp.qs_operation_hours->'everyday' ='true' ${nameCnd} ${typeCnd} ${styleCnd} ${locationCnd} ${priceCnd} ${attendeesCnd} ${maxHourCnd} ${amenitiesCnd}
      union all
      ${fetchSpotQuery},jsonb_array_elements(qqp.qs_operation_hours->'weekdays') weeks, jsonb_array_elements(weeks->'slots') slots WHERE  qms.staus= $1 and qms.form_last_step=4 
      and qqp.qs_operation_hours->'weekdays' is not null ${whenDateWeekCnd} ${whenStartTimeCnd} ${whenEndTimeCnd} ${nameCnd} ${typeCnd} ${styleCnd} ${locationCnd} ${priceCnd} ${attendeesCnd} ${maxHourCnd} ${amenitiesCnd}
      union all
      ${fetchSpotQuery}, jsonb_array_elements(qqp.qs_operation_hours->'calendar') cald,jsonb_array_elements(cald->'slots') slots WHERE qms.staus= $1 and qms.form_last_step=4 and qqp.qs_operation_hours->'calendar' is not null
      ${whenDateCaldCnd} ${whenStartTimeCnd} ${whenEndTimeCnd} ${typeCnd} ${styleCnd} ${nameCnd} ${locationCnd} ${priceCnd} ${attendeesCnd} ${maxHourCnd} ${amenitiesCnd}) spots ${blockedCnd}`;

      //  query for fetch data count
      let countQuery = `select count(*) from (${commonQuery}) spots`;
      //  query for fetch data
      let query = `${commonQuery} ${sortCnd} ${pageCnd}`;

      db.query(countQuery, [quickSpotStatus.active], (error, res) => {
        if (error) {
          throw error;
        } else {
          let spotCount = res.rows[0]?.count;
          db.query(query, [quickSpotStatus.active], (error, res) => {
            if (error) {
              throw error;
            } else {
              resolve({
                data: res.rows,
                spotCount: spotCount,
                searchHeading: `${spotCount} ${searchHeadingCatStyle}spaces found${searchHeadingLocation}`,
              });
            }
          });
        }
      });
    } catch (err) {
      console.log("err-fetchSpots", JSON.stringify(err));
      reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

const fetchCityOrCategory = async (keyName) => {
  return new Promise((resolve, reject) => {
    try {
      let query = "";
      if (keyName == "qs_city") {
        query = `SELECT qs_address->'city',count(qms.quickspot_id),qli.qs_lookup_details FROM spot.qs_my_quickspot qms inner join spot.qs_lookup_info qli on qms.qs_address->'city' = qli.qs_lookup_details->'title' where qs_lookup_key='qs_city' and qms.staus= $1 and qms.form_last_step=4
        GROUP BY qs_address->'city',qli.qs_lookup_details order by count(qms.quickspot_id) desc`;
      } else {
        query = `SELECT qs_type_id,count(qms.quickspot_id), qli.qs_lookup_details FROM spot.qs_my_quickspot qms inner join spot.qs_lookup_info qli on qms.qs_type_id = qli.qs_lookup_id where qs_lookup_key='qs_category' and qms.staus= $1 and qms.form_last_step=4
GROUP BY qs_type_id,qli.qs_lookup_id order by count(qms.quickspot_id) desc`;
      }

      db.query(query, [quickSpotStatus.active], (error, res) => {
        if (error) {
          throw error;
        } else {
          resolve(res.rows);
        }
      });
    } catch (err) {
      console.log("err-fetchSpots", JSON.stringify(err));
      reject({
        status: error_code.serverSideError,
        message: error_messages.db_issue,
        err,
      });
    }
  });
};

module.exports = {
  saveSpot,
  fetchSpotDataWithId,
  fetchMySpots,
  deleteSpot,
  fetchSpots,
  manageWishListSpot,
  fetchWishList,
  fetchWishListSpots,
  fetchCityOrCategory,
};
