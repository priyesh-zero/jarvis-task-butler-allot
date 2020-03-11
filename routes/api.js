const router = require('express').Router()

router.get('/', (request, response) => {
	response.json({response: "Api Route working"})
})

module.exports = router
