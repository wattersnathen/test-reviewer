// TODO: will eventually want pagination support
// as these documents will get extremely numerous
// at scale

const COLLECTION = 'test-reporter'

exports.getCount = async (db, opts) => {
    return db.collection(COLLECTION).countDocuments(
        opts.query ? opts.query : {},
        opts.options ? opts.options: {}
    )
}

exports.getTests = async (db, opts) => {
    return db.collection(COLLECTION).find(
        opts.query ? opts.query : {},
        opts.options ? opts.options: {}
    ).toArray()
}

exports.getTest = async (db, id, opts) => {
    return db.collection(COLLECTION).find(
        { ...opts.query, testId: id },
        opts.options ? opts.options : {}
    ).toArray()
}

exports.insertTest = async (db, data, options) => {
    return db.collection(COLLECTION).insertMany(data, { ...options, ordered: false })
}