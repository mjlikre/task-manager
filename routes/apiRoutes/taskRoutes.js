const router = require('express').Router();
const authMiddleware = require('./../../middlewares/authMiddlewares');
const taskController = require("./../../controllers/taskControllers")

router.route('/test')
  .get((req, res) => {
        console.log("hey")
        res.send("hey");
  });

router.route("/add")
  .post(authMiddleware.requireAuth, taskController.addTask)

router.route("/get")
  .get(authMiddleware.requireAuth, taskController.getTask)

module.exports = router;