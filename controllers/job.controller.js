const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { jobService, } = require('../services');

const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
const saveTime = catchAsync(async (req, res) => {
    // console.log(req.body);
    // console.log(req.body?.jobtime);
    const body = []
    for (const bod in req.body?.jobtime) {
        body.push({
            "user_id": req.body.user_id,
            "job_id": bod,
            "time_in": formatTime(req.body?.jobtime[bod]),
            "total_hrs": formatTime(req.body?.total_time),
        })
    }
    // console.log(body);
    const shift = await jobService.saveTime(body);
    res.status(httpStatus.CREATED).send(shift);
});

const saveShift = catchAsync(async (req, res) => {
    // console.log(req.body);
    const body = {
        "job_code": req.body.job_code,
        "desciption": req.body.job_description,
        "name": req.body.job_name,
        "country": req.body.location,
        "state": req.body.sub_location,
        "rating": req.body.rating,
        "job_rate": req.body.job_rate,

    }
    // console.log(req.body);
    const shift = await jobService.saveShift(body);
    res.status(httpStatus.CREATED).send({ shift });
});


const jobhistory = catchAsync(async (req, res) => {
    console.log(req.query)
    console.log(req.body)
    //   const filter = pick(req.query, ["search"]);
    const result = await jobService.jobhistory(req.query);
    res.send(result);
});

const getShift = catchAsync(async (req, res) => {
    //   const filter = pick(req.query, ["search"]);
    const result = await jobService.queryShift();
    res.send(result);
});

const getCode = catchAsync(async (req, res) => {
    //   const filter = pick(req.query, ["search"]);
    const result = await jobService.getCode();
    res.send(result);
});

const getDetailsById = catchAsync(async (req, res) => {
    // console.log(req);
    // console.log(req.params);
    // console.log(req.query);
    const result = await jobService.getDetailsById(req.params.id);
    res.send(result);
});

const editShift = catchAsync(async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    const body = {
        "job_code": req.body.job_code,
        "desciption": req.body.job_description,
        "name": req.body.job_name,
        "country": req.body.location,
        "state": req.body.sub_location,
        "rating": req.body.rating,
        "jobid": req.body.jobid,
        "job_rate": req.body.job_rate,

    }

    const shift = await jobService.editShift(body, req.params.id);
    res.send(shift);
    // res.send({ "sdasd": "asdas" });
});


const deletShift = catchAsync(async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);

    const shift = await jobService.deletShift(req.params.id);
    res.status(httpStatus.OK).send({ "success": "success" });
});

const assignedJob = catchAsync(async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);

    const body = {
        "job_code": req.body.job_code,
        "job_id": req.body.job_id,
        "user_id": req.body.user_id,
        "job_name": req.body.job_name,
        "job_rate": req.body.job_rate,
    }
    const shift = await jobService.assignedJob(body);
    res.send(shift);
    // res.send({ "sdasd": "asdas" });
});


const getuserjob = catchAsync(async (req, res) => {
    // console.log(req);
    // console.log(req.params);
    // console.log(req.query);
    const result = await jobService.getuserjob(req.params.id);
    res.send(result);
});


const payjob = catchAsync(async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);
    const body = {
        "id": req.body.id,
        "paid": 1,
    }

    const shift = await jobService.payjob(body, req.body.id);
    res.send(shift);
    // res.send({ "sdasd": "asdas" });
});

module.exports = {
    saveShift,
    getShift,
    getDetailsById,
    getCode,
    editShift,
    deletShift,
    assignedJob,
    getuserjob,
    saveTime,
    jobhistory,
    payjob
};