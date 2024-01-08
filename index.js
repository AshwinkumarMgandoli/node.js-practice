const express = require("express")
const users = require("./MOCK_DATA.json")
const app = express()
const fs = require('fs')

app.use(express.urlencoded({extended: false}))

const PORT = 8000;

app.get('/users', (req, res)=> {
   return res.json(users)
})

app.get('/api/users', (req, res)=> {
   return res.json(users)
})

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user  = users.find(user => user.id === id)
    return res.json(user.first_name)
   
})

app.post('/api/users', (req, res)=> {
   const Body = req.body;
   users.push({...Body, id: users.length + 1})
   fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=> {
      return res.json({"status": "sucess"})
   })
   
   

})




app.listen(PORT, ()=>console.log(`app is lsitening at port : ${PORT}`))