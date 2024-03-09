const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { jobService, } = require('../services');

const saveShift = catchAsync(async (req, res) => {
    // console.log(req.body);
    const body = {
        "job_code": req.body.job_code,
        "desciption": req.body.job_description,
        "name": req.body.job_name,
        "country": req.body.location,
        "state": req.body.sub_location,
        "rating": req.body.rating,

    }
    // console.log(req.body);
    const shift = await jobService.saveShift(body);
    res.status(httpStatus.CREATED).send({ shift });
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

    const shift = await jobService.editShift(req.body, req.params.id);
    res.send(shift);
    // res.send({ "sdasd": "asdas" });
});


const deletShift = catchAsync(async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);

    const shift = await jobService.deletShift(req.params.id);
    res.status(httpStatus.OK).send({ "success": "success" });
});



module.exports = {
    saveShift,
    getShift,
    getDetailsById,
    getCode,
    editShift,
    deletShift
};