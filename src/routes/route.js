const express = require('express');
const router = express.Router();

const batchController= require("../controllers/batchController")
const devloperController= require("../controllers/devloperController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/batches", batchController.createBatches )

router.post("/devlopers", devloperController.createDevlopers  )

router.get("/scholarshipDevelopers", devloperController.scholarshipDevelopers)

router.get("/developers-query", devloperController.developers );

module.exports = router;