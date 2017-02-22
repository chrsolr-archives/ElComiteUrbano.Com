'use strict';

const mongoose = require('mongoose');

const UserModel = (() => {
    const schema = {
        google: { type: Object },
        email: { type: String, required: true },
        isAnAdmin: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    };

    const UserSchema = mongoose.Schema(schema);

    UserSchema.pre('save', function(next) {
        this.email_canonical = this.email.toLowerCase();

        return next();
    });

    return UserSchema;
})();

module.exports = mongoose.model('User', UserModel, 'Users');