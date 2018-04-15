'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidatorContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = (req, res, next) => {
    repository
        .get()
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

exports.getBySlug = (req, res, next) => {
    repository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tag)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres.');
 
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository
        .create(req.body)
        .then(p => {
            res.status(200).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
        repository
        .update
        .then(p => {
            res.status(201).send({
                message: 'Produto atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar produto',
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    repository
        .delete(req.body.id)
        .findOneAndRemove(req.body.id)
        .then(x => {
            res.status(201).send({
                message: 'Produto removido com sucesso!'
            });
        }).catch(x => {
            res.status(400).send({
                message: 'Falha ao remover produto',
                data: x
            });
        });
};

