const express = require('express')

// To do, create controller
const {
    createTest,
    getTest,
    getAllTests,
    deleteTest,
    updateTest
} = require('../controllers/testController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require Auth

router.use(requireAuth)

// CRUD operations


router.get('/', getAllTests)

router.get('/:id', getTest)

router.post('/', createTest)

router.delete('/:id', deleteTest)

router.patch('/:id', updateTest)

module.exports = router