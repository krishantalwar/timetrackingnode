
/**
 * Aggregate Paging
 * @param {String} totalResults
 * @param {String} page
 * @param {String} limit
 * @param {Array} data
 * @returns {Promise<Contract>}
 */

const aggregatePaging = async (totalResults, page, limit, data) => {
    const totalPages = Math.ceil(totalResults / limit);
    const result = {
        data,
        page,
        limit,
        totalPages,
        totalResults,
    };
    return result;
};

module.exports = {
    aggregatePaging,
};