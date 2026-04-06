const paginate = (query) => {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(query.limit) || 12));
    return { page, limit, offset: (page - 1) * limit };
};
const paginateResponse = (data, total, page, limit) => ({
    data, pagination: { total, page, limit, totalPages: Math.ceil(total / limit), hasNext: page < Math.ceil(total / limit), hasPrev: page > 1 }
});
module.exports = { paginate, paginateResponse };
