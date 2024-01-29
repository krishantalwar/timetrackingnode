const allRoles = {
    user: [],
    admin: ['getLookups', 'manageLookups'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};