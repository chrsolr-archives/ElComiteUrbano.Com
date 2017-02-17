'use strict';

const mongoose = require('mongoose');

const PromoModel = (() => {
    const schema = {
        artists: { type: String, require: true },
        createdAt: { type: Date, default: Date.now, require: true },
        downloadUrl: { type: String, require: true },
        imageUrl: { type: String, require: true },
        title: { type: String, require: true }
    };

    const PromoSchema = new mongoose.Schema(schema);

    return PromoSchema;
})();

module.exports = mongoose.model('Promo', PromoModel, 'Promos');