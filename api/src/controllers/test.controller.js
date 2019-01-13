const { TestModel, TestResultFilter } = require('../models')
const { isValidState } = require('../../lib/test.states')

exports.getNumberOfTests = async (req, res) => {
    const data = await TestModel.getCount(req.app.locals.db, {})
    return res.json({ data })
}

exports.getTests = async (req, res) => {
    const data = await TestModel.getTests(req.app.locals.db, {})
    return res.json({ data })
}

exports.getTest = async (req, res) => {
    const { id } = req.params
    let data
    if (!req.query || Object.keys(req.query).length === 0) {
        data = await TestModel.getTest(req.app.locals.db, id, {})
        return res.json({ data })
    }
    const testResultFilter = new TestResultFilter(req.query)
    const query = testResultFilter
        .filterByState()
        .getQuery()
    console.log('query', query)
    data = await TestModel.getTest(req.app.locals.db, id, { query })
    return res.json({ data })
}

exports.getTestCount = async (req, res) => {
    const { id } = req.params
    const data = await TestModel.getCount(req.app.locals.db, {
        query: {
            testId: id
        }
    })
    return res.json({ data })
}

// TODO: input validation...required body parameters were passed
exports.createTest = async (req, res) => {
    if (!Array.isArray(req.body)) {
        req.body = [ req.body ]
    }
    const body = req.body
    await TestModel.insertTest(req.app.locals.db, body, {})
    return res.status(201).send({ data: `successfully inserted ${body.length} test(s)` })
}

exports.replaceTest = (req, res) => {}

exports.updateTest = (req, res) => {}

exports.deleteTest = (req, res) => {}

exports.getTestIds = async (req, res) => {
    const data = await TestModel.getFieldValue(req.app.locals.db, 'testId')
    return res.json({ data })
}

exports.getTestNames = async (req, res) => {
    const data = await TestModel.getFieldValue(req.app.locals.db, 'name')
    return res.json({ data })
}

exports.getTestSuites = async (req, res) => {
    const data = await TestModel.getFieldValue(req.app.locals.db, 'suite')
    return res.json({ data })
}

exports.getRunIds = async (req, res) => {
    const data = await TestModel.getFieldValue(req.app.locals.db, 'runId')
    return res.json({ data })
}