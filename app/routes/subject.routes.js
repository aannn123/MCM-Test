const { body } = require("express-validator");
const subjects = require("../controllers/subject.controller")
let router = require("express").Router()

// Create a new Tutorial
router.post("/", [
    body('name').isLength({ min: 5 }).withMessage('Nama minimal 5 karakter'),
    body('semester').notEmpty().withMessage('Semester harus diisi'),
], subjects.create);

router.get("/", subjects.getAll)
router.get("/:id", subjects.findOne)
router.delete('/:id', subjects.delete)

router.put("/:id", [
    body('name').isLength({ min: 5 }).withMessage('Nama minimal 5 karakter'),
    body('semester').notEmpty().withMessage('Semester harus diisi'),
], subjects.update);

module.exports = router