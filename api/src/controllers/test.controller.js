const { TestModel } = require('../models')

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
    const data = await TestModel.getTest(req.app.locals.db, id, {})
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