const express = require('express')
const cors = require('cors')
const app = express()

const studentRoute = require('./app/routes/student.routes')
const subjectRoute = require('./app/routes/subject.routes')
const studyPlanRoute = require('./app/routes/studyPlan.routes')

let corsOptions = {
    origin: "http://localhost:8081"
}
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log(`Synced db.  ${PORT}`);
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500
    const message = error.message
    const data = error.data

    res.status(status).json({ message: message, data: data })
})

app.use('/api/student', studentRoute)
app.use('/api/subject', subjectRoute)
app.use('/api/study-plan', studyPlanRoute)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})