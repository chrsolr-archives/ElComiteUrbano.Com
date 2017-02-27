'use strict';

const PromoModel = require('../../models').Promo;

class PromoDB {

    getAll() {
        return new Promise((resolve, reject) => {
            const query = PromoModel.find({
                isActive: true
            });
            query.select('-_id');
            query.sort({
                'createdAt': -1
            });
            query.limit(10);
            query.lean();
            query.exec((err, docs) => {

                if (err) {
                    return reject(new Error(err));
                }

                return resolve(docs);
            });
        });
    }

    createPromo(promo) {
        return new Promise((resolve, reject) => {
            const model = new PromoModel(promo);
            model.save((err, doc) => {
                if (err) {
                    return reject(err);
                }

                return resolve(doc);
            });
        });
    }
}

module.exports = new PromoDB();