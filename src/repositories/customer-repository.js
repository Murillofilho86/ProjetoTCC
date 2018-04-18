'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async() => {
    const res = await Customer.find({
            active: true
        }, 'title price slug');
        return res;
};

exports.getById = async(id) => {
    const res = await Customer
    .findById(id);
    return res;
};

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
};

exports.update = async(id, data) => {
    await Customer
    .findByIdAndUpdate(req.params.id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
}

exports.delete = async(id) => {
    await Customer
        .findOneAndRemove(id)
}