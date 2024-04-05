const db = require("../models");
const Job = db.job;
const UserJobs = db.user_jobs;
const UserJobsTime = db.user_jobs_time;


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



const jobhistory = async (filter, options) => {

    const code = await UserJobsTime.findAll(
        {

            include: [
                'user',
                'job'
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
