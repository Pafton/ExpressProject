const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', { title: 'Loty Kosmiczne', message: 'Witaj w aplikacji o lotach kosmicznych!' })
})

module.exports = router
