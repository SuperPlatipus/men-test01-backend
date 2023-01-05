const Test = require('../models/testModel')
const mongoose = require('mongoose')

//  TO CREATE

// createTest,
// getTest,
// getAllTests,
// deleteTest,
// updateTest


// get all

const getAllTests = async (req, res) => {
    const user_id = req.user._id

    const tests = await Test.find({ user_id }).sort({ createdAt: -1 })

    res.status(200).json(tests)

}

// get single

const getTest = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Test ID inexisting'})
    }

    const test = await Test.findById(id)

    if (!test) {
        return res.status(404).json({error: 'Test ID inexisting'})
    }
    res.status(200).json(test)

}

// create new

const createTest = async (req, res) => {
    const {
        title,
        description,
        testee,
        testPseudo3d,
        test3d,
        keywords,
        // shareable
    } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!testee) {
        emptyFields.push('testee')
    }
    if (!testPseudo3d) {
        emptyFields.push('testPseudo3d')
    }
    if (!test3d) {
        emptyFields.push('test3d')
    }
    if (!keywords) {
        emptyFields.push('keywords')
    }
    // if (!shareable) {
    //     emptyFields.push('shareable')
    // }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill all fields', emptyFields})
    }

    try {
        const user_id = req.user._id
        const test = await Test.create({
            title,
            description,
            testee,
            testPseudo3d,
            test3d,
            keywords,
            // shareable,
            user_id
        })
        res.status(200).json(test)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// delete single

const deleteTest = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Test ID inexisting'})
    }

    const test = await Test.findOneAndDelete({ _id: id })

    if (!test) {
        return res.status(400).json({error: 'Test ID inexisting'})
    }

    res.status(200).json(test)

}

// update single

const updateTest = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Test ID inexisting'})
    }
    const test = await Test.findByIdAndUpdate({ _id: id}, {...req.body})

    if (!test) {
        return res.status(400).json({error: 'Test ID inexisting'})
    }
    res.status(200).json(test)
}

module.exports = {
    createTest,
    getTest,
    getAllTests,
    deleteTest,
    updateTest
}

// remember check for workounts in thsi code file