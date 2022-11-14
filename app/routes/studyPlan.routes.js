const { body } = require("express-validator");
const studyPlans = require("../controllers/studyPlan.controller")
let router = require("express").Router()

// Create a new Tutorial
router.post("/", [
    body('studentId').notEmpty().withMessage('Id mahasiswa tidak boleh kosong'),
    body('subjectId').notEmpty().withMessage('Id mata kuliah tidak boleh kosong'),
], studyPlans.create);
router.put("/:id", [
    body('studentId').notEmpty().withMessage('Id mahasiswa tidak boleh kosong'),
    body('subjectId').notEmpty().withMessage('Id mata kuliah tidak boleh kosong'),
], studyPlans.update);

router.get("/", studyPlans.getAll)
router.get("/:id", studyPlans.findOne)
router.delete('/:id', studyPlans.delete)

module.exports = router