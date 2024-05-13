const { Router } = require('express')
const authenticateToken = require('../middlewares/auth.middleware')
const apiVersionMiddleware = require('../middlewares/version.middleware')
const MethodMiddleware = require('../middlewares/method.middleware')
const router = Router()


router.get('*', (req, res) => {
	res.redirect(process.env.CURRENT_URL)
})


router.post('/api/v1', authenticateToken, apiVersionMiddleware, MethodMiddleware)




module.exports = router