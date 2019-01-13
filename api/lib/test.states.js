
const states = Object.freeze({
    PASS: 'pass',
    FAIL: 'fail',
    SKIP: 'skip',
    ERROR: 'error'
})

module.exports = {
    VALID_STATES: states,
    isValidState: state => {
        switch(state.toLowerCase()) {
            case 'pass':
            case 'passed':
            case 'fail':
            case 'failed':
            case 'skip':
            case 'skipped':
            case 'error':
            case 'errored':
                return true
            default:
                return false
        }
    }
}