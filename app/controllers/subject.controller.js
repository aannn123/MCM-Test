const { validationResult } = require('express-validator');
const db = require('../models')
const Subject = db.subjects

// Create and Save
exports.create = (req, res) => {
    let body = req.body;

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).send({
            message: errors.array()
        })
    } else {
        Subject.create(body)
            .then(data => {
                res.status(201).json({
                    message: "Mata Kuliah berhasil terbuat",
                    data: data
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Subject."
                })
            })
    }

};

// Retrieve all data from the database.
exports.getAll = (req, res) => {
    let limit = req.query.limiy ?? 5
    let page = req.query.page ?? 1;
    let offset = 0 + (page - 1) * limit

    Subject.findAndCountAll({
        offset: offset,
        limit: limit,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.status(200).json({
            message: 'Mata Kuliah berhasil ditampilkan',
            data: result,
            perPage: limit,
            totalPage: Math.ceil(result.count / limit),
            currentPage: offset
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Subject."
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id


    Subject.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: "Mata Kuliah berhasil dihapus"
                })
            } else {
                res.status(404).json({
                    message: `Tidak dapat menghapus Mata Kuliah di id=${id}. mungkin Mata Kuliah tidak ditemukan!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Tidak dapat menghapus Mata Kuliah di id=" + id
            })
        })

}

exports.findOne = (req, res) => {
    Subject.findByPk(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'Mata Kuliah berhasil ditampilkan',
                    data: data,
                })
            } else {
                res.status(200).json({
                    message: 'Mata Kuliah tidak ditemukan',
                    data: null,
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Subject."
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).send({
            message: errors.array()
        })
    } else {
        Subject.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.status(200).json({
                        message: "Mata Kuliah Berhasil diupdate",
                    })
                } else {
                    res.send({
                        message: `Tidak dapat mengedit Mata Kuliah di id=${id}. mungkin Mata Kuliah tidak ditemukan!!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Tidak dapat mengedit Mata Kuliah di id=" + id
                });
            })
    }
};