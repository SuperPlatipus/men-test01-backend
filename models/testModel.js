const mongoose = require('mongoose')
const Schema = mongoose.Schema

const testSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },
    testee: {
        type: String,
        required: false,
    },
    user_id: {
        type: String,
        required: true
    },
    testPseudo3d: {
        type: [Schema.Types.Mixed],
        required: true
    },
    test3d: {
        type: [Schema.Types.Mixed],
        required: true
    },
    keywords: {
        type: [String],
        required: false
    },
    // shareable: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // }

}, {timestamps: true})

module.exports = mongoose.model('Test', testSchema)