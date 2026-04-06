// auth Controller — handles HTTP requests
// Pattern: req → controller → service → repository → response
// TODO: Implement each method

module.exports = {
    register: async (req, res, next) => { res.json({ message: 'TODO: register' }); },
    login: async (req, res, next) => { res.json({ message: 'TODO: login' }); },
    refreshToken: async (req, res, next) => { res.json({ message: 'TODO: refresh' }); },
    logout: async (req, res, next) => { res.json({ message: 'TODO: logout' }); }
};
