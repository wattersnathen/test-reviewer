const { MongoClient } = require('mongodb')
const { IllegalAccessError } = require('../../errors')

class Mongo {
    constructor(opts = {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
        database: process.env.MONGO_DATABASE || 'test-reporter'
    }) {
        this.uri = opts.uri
        this.database = opts.database
        this.connectionString = `${this.uri}/${this.database}`
    }

    async connect(opts) {
        const client = await MongoClient.connect(this.connectionString, { ...opts, useNewUrlParser: true })
        this.client = client
    }

    async close() {
        if (!this.client) throw new IllegalAccessError('Client was not initialized. Did you call connect first?')
        await this.client.close()
        this.client = null
    }

    getDb(db = 'qa') {
        return this.client.db(db)
    }
}

module.exports = Mongo