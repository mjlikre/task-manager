const router      = require('express').Router();
const authRoutes  = require('./authRoutes');
const taskRoutes = require("./taskRoutes")
const passportService = require('./../../services/passport');

const authMiddleware = require('./../../middlewares/authMiddlewares');
// / api prepended to these routes

router.route('/test')
  .get(authMiddleware.requireAuth, (req, res) => {
    console.log(req.user, "i got here")
    res.send(req.user);
  });

router.use('/auth', authRoutes);

router.use("/tasks", taskRoutes); 

module.exports = router;