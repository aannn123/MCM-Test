const { validationResult } = require('express-validator');
const db = require('../models')
const StudyPlan = db.studyPlans
const Student = db.students
const Subject = db.subjects



function isDataUnique(studentId, subjectId) {
    return StudyPlan.count({ where: { studentId: studentId, subjectId: subjectId } })
        .then(count => {
            if (count != 0) {
                return false;
            }
            return true;
        });
}

let student = StudyPlan.belongsTo(Student, { foreignKey: "studentId", as: "student" });
let subject = StudyPlan.belongsTo(Subject, { foreignKey: "subjectId", as: "subject" });

// Create and Save
exports.create = (req, res) => {
    let body = req.body;

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).send({
            message: errors.array()
        })
    } else {
        let studentId = req.body.studentId;
        let subjectId = req.body.subjectId;
        Student.findByPk(studentId)
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        message: "Mahasiswa tidak ditemukan"
                    })
                }
            })

        Subject.findByPk(subjectId)
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        message: "Mata Kuliah tidak ditemukan"
                    })
                }
            })

        isDataUnique(studentId, subjectId).then(isUnique => {
            if (isUnique) {
                StudyPlan.create(body)
                    .then(data => {
                        res.status(201).json({
                            message: "Kartu rencana studi berhasil terbuat",
                            data: data
                        })
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Study Plan."
                        })
                    })
            } else {
                res.status(404).json({
                    message: "Kartu rencana studi sudah tersedia",
                    data: null
                })
            }
        });
    }
};

// Retrieve all data from the database.
exports.getAll = (req, res) => {
    let limit = req.query.limiy ?? 5
    let page = req.query.page ?? 1;
    let offset = 0 + (page - 1) * limit

    StudyPlan.findAndCountAll({
        offset: offset,
        include: [student, subject],
        limit: limit,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.status(200).json({
            message: 'KRS berhasil ditampilkan',
            data: result,
            perPage: limit,
            totalPage: Math.ceil(result.count / limit),
            currentPage: offset
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Study Plan."
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id

    StudyPlan.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: "KRS berhasil dihapus"
                })
            } else {
                res.status(404).json({
                    message: `Tidak dapat menghapus KRS di id=${id}. mungkin KRS tidak ditemukan!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Tidak dapat menghapus KRS di id=" + id
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
        let studentId = req.body.studentId;
        let subjectId = req.body.subjectId;
        Student.findByPk(studentId)
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        message: "Mahasiswa tidak ditemukan"
                    })
                }
            })

        Subject.findByPk(subjectId)
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        message: "Mata Kuliah tidak ditemukan"
                    })
                }
            })

        isDataUnique(studentId, subjectId).then(isUnique => {
            if (isUnique) {
                StudyPlan.update(req.body, {
                    where: { id: id }
                })
                    .then(num => {
                        if (num == 1) {
                            res.status(200).json({
                                message: "KRS Berhasil diupdate",
                            })
                        } else {
                            res.send({
                                message: `Tidak dapat mengedit KRS di id=${id}. mungkin KRS tidak ditemukan!!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Tidak dapat mengedit KRS di id=" + id
                        });
                    })
            } else {
                res.status(404).json({
                    message: "Kartu rencana studi sudah tersedia",
                    data: null
                })
            }
        });
    }
};

exports.findOne = (req, res) => {
    StudyPlan.findByPk(req.params.id,{
        include:[student, subject]
    })
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'KRS berhasil ditampilkan',
                    data: data,
                })
            } else {
                res.status(200).json({
                    message: 'KRS tidak ditemukan',
                    data: null,
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving KRS."
            })
        })
}