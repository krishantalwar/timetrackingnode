const db = require("../models");
const Job = db.job;
const UserJobs = db.user_jobs;
const UserJobsTime = db.user_jobs_time;


const { Op } = require('sequelize');
const saveTime = async (userBody) => {


    const userd = userBody.forEach(async (user) => {

        const [record, created] = await UserJobsTime.findOrCreate({
            where: { user_id: user.user_id, job_id: user.job_id },
            defaults: user // If record doesn't exist, create it with user details
        });
        if (!created) {
            // If record already exists, update it with the new values
            await record.update(user);
        }

    });
    // const user = UserJobsTime.bulkCreate(userBody, {
    //     fields: ["user_id", "job_id", 'time_in', "total_hrs"],
    //     // updateOnDuplicate: ["user_id", "job_id"],
    //     updateOnDuplicate,
    //     returning: true,
    //     alias: 'record'
    //     // conflictAttributes: ["userid", "job_id"],


    // })
    return userd;
};
const saveShift = async (userBody) => {
    console.log(userBody);
    const user = await Job.create(userBody);
    return user;
};



const jobhistory = async (filter = {}, options = {}) => {

    console.log(filter)
    console.log(options)
    let jobClause = {};
    let userClause = {};
    if (filter?.job_name) {
        jobClause.name = {
            [Op.like]: "%" + filter?.job_name + "%"
        };
    }
    if (filter?.job_code) {
        jobClause.job_code = {
            [Op.like]: "%" + filter?.job_code + "%"
        };
    }

    if (filter?.first_name) {
        userClause.first_name = {
            [Op.like]: "%" + filter?.first_name + "%"
        };
    }
    if (filter?.user_code) {
        userClause.user_code = {
            [Op.like]: "%" + filter?.user_code + "%"
        };
    }

    const code = await UserJobsTime.findAll(
        {

            // include: [
            //     'user',
            //     'job'
            // ]
            include: [
                {
                    association: 'user',
                    // attributes: ['name'],
                    where: userClause
                },
                {
                    association: 'job',
                    // attributes: ['rate'],
                    where: jobClause
                    // where: {
                    //     // Add your like condition for the User association here
                    //     // For example, if you want to match usernames that contain 'john':
                    // name: {
                    //     [Op.like]: '%john%'  // Replace 'john' with the pattern you want to match
                    // }
                    // }
                }
            ]

        }
    );
    return code;
}
const queryShift = async (filter, options) => {
    //   const limit =
    //     options.limit && parseInt(options.limit, 10) > 0
    //   ? parseInt(options.limit, 10)
    //       : 10;
    //   const page =
    //     options.page && parseInt(options.page, 10) > 0
    //   ? parseInt(options.page, 10)
    //       : 1;
    //   const offset = (page - 1) * limit;

    //   let where = { user_type: { [Op.eq]: "qs_user" } };

    //   if (filter.search) {
    //     where = {
    //       ...where,
    //       [Op.or]: [
    //         { "user_info.firstName": { [Op.iLike]: "%" + filter.search + "%" } },
    //         { "user_info.lastName": { [Op.iLike]: "%" + filter.search + "%" } },
    //         { email: { [Op.iLike]: "%" + filter.search + "%" } },
    //       ],
    //     };
    //   }

    const totalResults = await Job.count();

    const shift = await Job.findAll({
        include: [
            'job_country',
            'job_state'
        ]

    });
    return shift;
    //   return aggregatePaging(totalResults, page, limit, shift);
};

const getCode = async () => {
    const code = await Job.count();
    return { code: "JB" + code };
};

const getDetailsById = async (id) => {
    const shift = await Job.findByPk(id, {});
    return shift;
};
const editShift = async (shiftBody, id) => {
    console.log(shiftBody);
    const shift = await Job.update(shiftBody, {
        where: {
            jobid: id,
        },
    });
    console.log(shift);
    return shift;
};

const deletShift = async (id) => {
    const shift = await Job.destroy({
        where: {
            jobid: id,
        },
    });
    console.log(shift);
    return shift;
};

const assignedJob = async (userBody) => {
    // console.log(userBody);
    const user = await UserJobs.create(userBody);
    return user;
};

const getuserjob = async (userBody) => {
    // console.log(userBody);
    const user = await UserJobs.findAll({
        where: { user_id: userBody },
        include: "job"
    });
    return user;
};

module.exports = {
    saveShift,
    queryShift,
    editShift,
    getCode,
    getDetailsById,
    deletShift,
    assignedJob,
    getuserjob,
    saveTime,
    jobhistory
};
