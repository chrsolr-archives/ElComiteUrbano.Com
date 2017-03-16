'use strict';

const SubscriptionModel = require('../../models').Subscription;
const uuidV4 = require('uuid/v4');

class SubscriptionDB {
    add(email) {
        return new Promise((resolve, reject) => {
            const query = SubscriptionModel.findOne({
                'email_canonical': email.toLowerCase().trim()
            });
            query.lean();
            query.exec((err, doc) => {
                if (err) {
                    return reject(err);
                }

                if (doc) {
                    return reject('Email Already Exist');
                }

                const schema = {
                    email: email,
                    email_canonical: email,
                    uuid: uuidV4()
                };

                const model = new SubscriptionModel(schema);
                model.save((err, doc) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(doc);
                });
            });
        });
    }
}

module.exports = new SubscriptionDB();