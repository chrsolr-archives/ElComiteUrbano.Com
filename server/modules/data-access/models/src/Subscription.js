'use strict';

const mongoose = require('mongoose');

const SubscriptionModel = (() => {
    const schema = {
        email: { type: String, required: true, trim: true },
        email_canonical: { type: String, lowercase: true, trim: true },
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date, default: Date.now},
        isActive: {type: Boolean, default: true}
    };

    const SubscriptionSchema = new mongoose.Schema(schema);

    return SubscriptionSchema;
})();

module.exports = mongoose.model('Subscription', SubscriptionModel, 'Subscriptions');