const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { lookupService } = require('../services');


const createLookup = catchAsync(async (req, res) => {
    const lookup = await lookupService.createLookup(req.body);
    res.status(httpStatus.CREATED).send(lookup);
});

const getLookups = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['qs_lookup_key']);
    filter.status = [
        { 'status': 0 },
        { 'status': 1 },
    ]
    const result = await lookupService.queryLookups(filter);
    res.send(result);
});

const getLookup = catchAsync(async (req, res) => {
    const lookup = await lookupService.getLookupById(req.params.lookupId);
    if (!lookup) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lookup not found');
    }
    res.send(lookup);
});

const updateLookup = catchAsync(async (req, res) => {
    const lookup = await lookupService.updateLookupById(req.params.lookupId, req.body);
    res.send(lookup);
});

const deleteLookup = catchAsync(async (req, res) => {
    await lookupService.deleteLookupById(req.params.lookupId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createLookup,
    getLookups,
    getLookup,
    updateLookup,
    deleteLookup,
};