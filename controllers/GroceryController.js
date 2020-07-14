const client = require("../models");
const uuid = require("uuid");
const e = require("express");

module.exports = {
  newGroceryList: async (req, res) => {
    try {
      const query = "INSERT INTO grocery_overview SET ?";
      const id = uuid.v4();
      await client.Client.query(
        query,
        {
          id: id,
          shopper: req.body.shopper,
          total: req.body.total,
          store: req.body.store,
          shop_date: req.body.date,
          payto: req.body.payto,
          creator_id: req.user
        },
        async (err, result) => {
          if (err) console.log( err);
          await client.Client.query(
            "SELECT * FROM grocery_overview WHERE id = ?",
            [id],
            (err, result) => {
              if (err) console.log( err);
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
        .json({ error: "server error, contact your uncle mike" });
    }
  },
  getSingleGroceryList: async (req, res) => {
    try{
      const query = "SELECT * FROM grocery_item WHERE grocery_list_id = ?";
      await client.Client.query(
          query, 
          [req.body.id],
          (err, result) => {
              if (err) console.log( err); 
              res.json({data: result})
          }
      )
    }catch(e) {
        console.log(e)
        return res.status(500).json({err: "Server error, contact your uncle mike"})
    }
  },
  deleteGroceryList: async (req, res) => {
    try{
        const query = "DELETE FROM grocery_overview WHERE id = ?"
        await client.Client.query(
            query, 
            [req.body.id],
            async (err, result) => {
                if (err) console.log( err);
                await client.Client.query(
                  "SELECT * FROM grocery_overview ",
                  (err, result) => {
                    if (err) console.log( err);
                    console.log(result);
                    res.json({ data: result });
                  }
                );
              }
        )

    }catch(e) {
        console.log(e)
        return res.status(500).json({error: "Server Error, contact uncle mike"})
    }
  },
  getAllGroceryList: async (req, res) => {
      try{
          const query = "SELECT * FROM grocery_overview";
          await client.Client.query(
              query, 
              (err, result) => {
                  if (err) console.log( err); 
                  let data = result
                  // console.log(data)
                  data.map((element, index) => {
                    if (element.creator_id === req.user) {
                      element.edit = 1 
                      console.log(element.creator_id, index)
                    }
                    else {
                      element.edit = 0
                      console.log(element.creator_id, index)
                    }
                  })
                  res.json({data: data})
              }
          )
      }catch(e) {
          console.log(e)
          return res.status(500).json({err: "Server error, contact your uncle mike"})
      }
  },
  addNewItem: async (req, res) => {
      try{
          const query = "INSERT INTO grocery_item SET ?"
          await client.Client.query(
              query, 
              {
                grocery_list_id: req.body.id,
                id: req.body.index,
                item: req.body.name,
                price: req.body.price,
                TC :req.body.TC,
                MJ: req.body.MJ,
                JC: req.body.JC,
                CO: req.body.CO,
                ER: req.body.ER,
                shareBetween: req.body.shareBetween,
                ppp: req.body.ppp
              },
              async (err, result) => {
                  if (err) console.log((err))
                  else{
                      await client.Client.query(
                          "SELECT * FROM grocery_item WHERE grocery_list_id = ?",
                          [req.body.id],
                          (err, result) => {
                              if (err) console.log( err);
                              res.json({data: result})
                          }
                      )
                  }
                }
          )

      }catch(e){
        console.log(e)
        res.status(500).json({error: "Server Error, contact uncle mike"})
      }
  },
  updateItem: async (req, res) => {
      try{
          const query = "UPDATE grocery_item SET TC = ?, MJ = ?, JC = ?, CO = ?, ER = ?, shareBetween = ?, ppp = ? WHERE grocery_list_id = ? and id = ?"
          console.log(req.body)
          await client.Client.query(
              query, 
              [
                req.body.TC,
                req.body.MJ,
                req.body.JC,
                req.body.CO,
                req.body.ER,
                req.body.shareBetween,
                req.body.ppp,
                req.body.grocery_list_id, 
                req.body.id
              ],
               async (err, result) => {
                   if (err) console.log( err); 
                   console.log(result)
                   client.Client.query(
                       "SELECT * FROM grocery_item WHERE grocery_list_id = ?",
                       [req.body.grocery_list_id],
                       (err, result) =>  {
                           if (err) console.log( err)
                           console.log(result)
                           res.json({data: result})
                       }
                   )
                   
               }
          )
      }catch(e) {
          console.log(e)
          res.status(500).json({error: "Server Error, contact uncle mike"})
      }
  },
  deteleItem: async (req, res) => {
      try{
          const query = "DELETE FROM grocery_item WHERE grocery_list_id = ? AND id = ?"
          await client.Client.query(
              query, 
              [req.body.id, req.body.index],
              async (err, result) => {
                if (err) console.log( err); 
                client.Client.query(
                    "SELECT * FROM grocery_item WHERE grocery_list_id = ?",
                    [req.body.id],
                    (err, result) =>  {
                        if (err) console.log( err)
                        res.json({data: result})
                    }
                )
                
            } 
          )
      }catch(e){
         console.log(err)
         res.json(500).json({error: "Server Error, contact uncle mike"})
      }
  },
  newSplit: async (req, res) => {
    try{
        const query = "INSERT INTO cost_split SET ?"
        await client.Client.query(
            query, 
            {
                grocery_list_id: req.body.id,
                TC: 0,
                MJ: 0,
                JC: 0,
                CO: 0,
                ER: 0
            },
            async (err, result) => {
              if (err) console.log( err); 
              client.Client.query(
                  "SELECT * FROM cost_split WHERE grocery_list_id = ?",
                  [req.body.id],
                  (err, result) =>  {
                      if (err) console.log( err)
                      res.json({data: result})
                  }
              )
              
          } 
        )
    }catch(e){
       console.log(err)
       res.json(500).json({error: "Server Error, contact uncle mike"})
    }
  },
  updateSplit: async (req, res) => {
    try{
        const query = "UPDATE cost_split set TC = ?, MJ = ?, JC = ?, CO = ?, ER = ? WHERE grocery_list_id = ?"
        await client.Client.query(
            query, 
            [parseFloat(req.body.TC), parseFloat(req.body.MJ), parseFloat(req.body.JC), parseFloat(req.body.CO), parseFloat(req.body.ER), req.body.id],
            async (err, result) => {
              if (err) console.log( err); 
              client.Client.query(
                  "SELECT * FROM cost_split WHERE grocery_list_id = ?",
                  [req.body.id],
                  (err, result) =>  {
                      if (err) console.log( err)
                      res.json({data: result})
                  }
              )
              
          } 
        )
    }catch(e){
       console.log(e)
       res.json(500).json({error: "Server Error, contact uncle mike"})
    }
  },
  getSplit: async (req, res) => {
    try{
      const query = "SELECT * FROM cost_split WHERE grocery_list_id = ?";
      await client.Client.query(
        query, 
        [req.body.id],
        (err, result) => {
          if (err) console.log( err); 
          res.json({data: result})
        }
      )
    }catch(e) {
      console.log(e)
      res.status(500).json({error: "Server Error, contact uncle mike"})
    }
  },
  getAllSplit: async (req, res) => {
    try{
      const query1 = "SELECT * FROM auth WHERE user_id = ?"
      const query = "SELECT * FROM cost_split"
      await client.Client.query(
        query1, 
        [req.user],
        async (err, result) => {
          if (err) console.log(err);
          else{
            const username = result[0].user_name
            const email = result[0].email
            console.log(username, "un")
            await client.Client.query(
              query, 
              (err, result2) => {
                if (err) console.log(err, "something went wrong")
                console.log(result2, "result2")
                let total = 0
                result2.map((item, index)=> {
                  if (username === "TC") {
                    total = total + item.TC
                  }else if (username === "MJ") { 
                    total = total + item.MJ
                  }else if (username === "CO") {
                    total = total + item.CO
                  }else if (username === "ER") { 
                    total = total + item.ER
                  }else if (username === "JC") { 
                    total = total + item.JC
                  }else if (username === "CW") {
                    total = total + item.CW
                  }else if (username === "CY") {
                    total = total + item.CY
                  }else if (username === "MW") {
                    total = total + item.MW
                  }else if (username === "AL") {
                    total = total + item.AL
                  }else if (username === "MR") {
                    total = total + item.MR
                  }
                })
                res.json({data: {total: total, user: username, email: email}})
              }
            )


          }
          
        }
      )
    }catch(e) {
      console.log(e)
      res.status(500).json({error: "Server Error, contact Uncle mike"})
    }
  } 
};
