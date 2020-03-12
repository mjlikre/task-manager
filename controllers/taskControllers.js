const client = require("../models");
const uuid = require("uuid");

module.exports = {
  addTask: async (req, res) => {
    try {
      const query = "INSERT INTO task SET ?";
      await client.Client.query(
        query,
        {
          id: req.user,
          task_name: req.body.task,
          task_description: req.body.description,
          priority: req.body.priority,
          due_date: req.body.due_date,
          task_id: uuid.v4(),
          completion_status: req.body.completion_status
        },
        async (err, result) => {
          if (err) throw err;
          await client.Client.query(
            "SELECT * FROM task WHERE id = ?",
            [req.user],
            (err, result) => {
              if (err) throw err;
              console.log(result);
              res.json({ data: result });
            }
          );
        }
      );
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ error: "Server Error, Contact Michael Jiang" });
    }
  },
  getTask: async(req, res) => {
    try{
        const query = "SELECT * FROM task WHERE id = ?"
        client.Client.query(query, [req.user], (err, result) => {
            if (err) throw err; 
            return res.json({ data: result });
        })
        
    }catch(e) {
        return res
            .status(500)
            .json({ error: "Server Error, Contact Michael Jiang" });
    }
  }
};
