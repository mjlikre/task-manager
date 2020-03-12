const client = require('../models')
const confic = require('./../config')
const jwt = require("jwt-simple")

module.exports = {
    addTask: async (req, res) => {
        console.log(req.user)
        console.log(req.body)
        try{
            await client.Client.query(`SELECT * FROM AUTH WHERE ID = ?`, [req.user], function (err, result) {
                if (err) throw err; 
                const tempItem = {
                    taskName: req.body.task, 
                    taskDescription: req.body.description
                }
                let newList = [...result[0].TASK_LIST, tempItem]



            })
        }catch(e) {

        }

    }
} 