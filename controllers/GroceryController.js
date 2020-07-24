const client = require("../models");
const uuid = require("uuid");
require('dotenv').config()

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
  getGroceryList: async(req, res) => {
    try{
      const query = "SELECT * FROM grocery_overview WHERE shopper_id = ?"
      await client.Client.query(
        query, 
        [req.user],
        (err, result) => {
          if (err) console.log(err)
          res.json({data: result})
        }
      )

    }catch(e){ 
      console.log(e)
      res.status(500).json({error: e})
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
                  data.map((element, index) => {
                    if (element.creator_id === req.user) {
                      element.edit = 1 
                    }
                    else {
                      element.edit = 0
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
                CW: req.body.CW,
                AL: req.body.AL,
                MW: req.body.MW,
                CY: req.body.CY,
                MR: req.body.MR,
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
          const query = "UPDATE grocery_item SET TC = ?, MJ = ?, JC = ?, CO = ?, ER = ?, CW = ?, AL = ?, MW = ?, CY = ?, MR = ?, shareBetween = ?, ppp = ? WHERE grocery_list_id = ? and id = ?"
          console.log(req.body)
          await client.Client.query(
              query, 
              [
                req.body.TC,
                req.body.MJ,
                req.body.JC,
                req.body.CO,
                req.body.ER,
                req.body.CW,
                req.body.AL,
                req.body.MW,
                req.body.CY,
                req.body.MR,
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
                ER: 0,
                CW: 0,
                MR: 0,
                AL: 0,
                MW: 0, 
                CY: 0
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
        const query = "UPDATE cost_split set TC = ?, MJ = ?, JC = ?, CO = ?, ER = ?, CW = ?, AL = ?, MW = ?, CY = ?, MR = ? WHERE grocery_list_id = ?"
        await client.Client.query(
            query, 
            [parseFloat(req.body.TC), parseFloat(req.body.MJ), parseFloat(req.body.JC), parseFloat(req.body.CO), parseFloat(req.body.ER), parseFloat(req.body.CW), parseFloat(req.body.AL), parseFloat(req.body.MW), parseFloat(req.body.CY), parseFloat(req.body.MR), req.body.id],
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
      const query = "SELECT * FROM cost_split INNER JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id WHERE cost_split.grocery_list_id = ?";
      await client.Client.query(
        query, 
        [req.body.id],
        (err, result) => {
          if (err) {
            console.log( err)
          }
          else if (result[0].creator_id === req.user || req.user === process.env.ADMIN_ID)  {
            res.json({data: {...result, authenticated: true}})
          }else{
            res.json({data: {...result, authenticated: false}})
          }
          
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
      
      await client.Client.query(
        query1, 
        [req.user],
        async (err, result) => {
          if (err) console.log(err);
          else{
            const username = result[0].user_name
            const email = result[0].email
            let query = ""
            if (username === "TC") {
              query = "SELECT cost_split.grocery_list_id, cost_split.TC, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id;"
            }else if (username === "MJ") { 
              query = "SELECT cost_split.grocery_list_id, cost_split.MJ, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id;"
            }else if (username === "CO") {
              query = "SELECT cost_split.grocery_list_id, cost_split.CO, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id;"
            }else if (username === "ER") { 
              query = "SELECT cost_split.grocery_list_id, cost_split.ER, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id;"
            }else if (username === "JC") { 
              query = "SELECT cost_split.grocery_list_id, cost_split.JC, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id;"
            }else if (username === "CW") {
              query = "SELECT cost_split.grocery_list_id, cost_split.CW, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id;"
            }else if (username === "CY") {
              query = "SELECT cost_split.grocery_list_id, cost_split.CY, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id;"
            }else if (username === "MW") {
              query = "SELECT cost_split.grocery_list_id, cost_split.MW, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id;"
            }else if (username === "AL") {
              query = "SELECT cost_split.grocery_list_id, cost_split.AL, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id;"
            }else if (username === "MR") {
              query = "SELECT cost_split.grocery_list_id, cost_split.MR, grocery_overview.shop_date, grocery_overview.total, grocery_overview.payto, grocery_overview.shopper FROM cost_split LEFT JOIN grocery_overview ON cost_split.grocery_list_id = grocery_overview.id;"
            }
            await client.Client.query(
              query, 
              [username],
              (err, result2) => {
                if (err) console.log(err, "something went wrong")

                res.json({data: {user: username, email: email, results: result2}})
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
