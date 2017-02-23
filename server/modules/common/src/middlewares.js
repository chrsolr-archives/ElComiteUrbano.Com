'use strict';

class Middleware {

    constructor() {}
 
    static isAuthenticated(req, res, next) {
        
        const user = req.user;

        if (!user) {
            return res.redirect('/');
        }

        return next();
    }

    static isAuthenticatedAndAdmin(req, res, next) {
        const user = req.user;

        if (!user || !user.isAnAdmin) {
            req.session.return_url = req.originalUrl;
            return res.redirect('/');
        }

        return next();
    }
}

module.exports = Middleware;