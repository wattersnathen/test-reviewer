const { isValidState } = require('../../lib/test.states')
const { InvalidArgumentError } = require('../../../errors')

function mapState(state) {
    switch(state.toLowerCase()) {
        case 'passed': return 'pass'
        case 'failed': return 'fail'
        case 'skipped': return 'skip'
        case 'errored': return 'error'
        default: return state.toLowerCase()
    }
}

class TestResultFilter {
    constructor(reqQuery) {
        if (!reqQuery || typeof reqQuery !== 'object') {
            throw new InvalidArgumentError('TestResultFilter cannot be instantiated without the query object')
        }
        this.reqQuery = reqQuery
        this.dbQuery = {}
    }
    filterByState() {
        if (!this.reqQuery.state && !this.reqQuery.result) return this
        const filters = this.reqQuery.state || this.reqQuery.result
        const states = filters.split(',').map(st => {
            st = mapState(st)
            if (isValidState(st)) {
                return st
            }
        }).filter(st => st)
        this.dbQuery.result = { $in: states }

        return this
    }
    getQuery() {
        return this.dbQuery
    }
}

module.exports = TestResultFilter