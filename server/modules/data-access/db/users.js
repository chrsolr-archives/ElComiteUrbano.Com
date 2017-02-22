'use strict';

const UserModel = require('../models').User;

class Users {
    constructor() {}

    login(profile) {
        return new Promise((resolve, reject) => {
            const delimiter = `${profile.google}.id`;

            const query = UserModel.findOne();
            query.where('google.id').equals(profile.google.id);
            query.lean();
            query.exec((err, user) => {
                if (err) {
                    return reject(err);
                }

                if (user) {
                    return resolve(user);
                }

                var User = new UserModel(profile);
                User.save((err, doc) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(doc);
                });
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            const query = UserModel.findOne({ _id: id });
            query.lean();
            query.exec((err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    }
}

module.exports = new Users();