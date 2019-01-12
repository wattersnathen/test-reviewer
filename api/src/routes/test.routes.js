const router = require('express').Router()
const { TestController } = require('../controllers')

router.get('/v1/tests', TestController.getTests)

router.get('/v1/tests/count', TestController.getNumberOfTests)

router.get('/v1/tests/:id', TestController.getTest)

router.get('/v1/tests/:id/count', TestController.getTestCount)

router.post('/v1/tests', TestController.createTest)

module.exports = router