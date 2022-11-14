const { body } = require("express-validator");
const students = require("../controllers/student.controller")
let router = require("express").Router()

// Create a new Tutorial
router.post("/", [
    body('fullName').isLength({ min: 5 }).withMessage('Nama Lengkap minimal 5 karakter'),
    body('gender').notEmpty().withMessage('Jenis Kelamin harus diisi'),
    body('college').notEmpty().withMessage('Perguruan Tinggi harus diisi'),
    body('level').notEmpty().withMessage('Jenjang harus diisi'),
    body('nim').notEmpty().withMessage('NIM harus diisi'),
], students.create);

router.get("/", students.getAll)
router.get("/:id", students.findOne)
router.delete('/:id', students.delete)

router.put("/:id", [
    body('fullName').isLength({ min: 5 }).withMessage('Nama Lengkap minimal 5 karakter'),
    body('gender').notEmpty().withMessage('Jenis Kelamin harus diisi'),
    body('college').notEmpty().withMessage('Perguruan Tinggi harus diisi'),
    body('level').notEmpty().withMessage('Jenjang harus diisi'),
    body('nim').notEmpty().withMessage('NIM harus diisi'),
], students.update);

module.exports = router