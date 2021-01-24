const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const database = require('./config/config_db')
const UsersModel = require('./model/users')

const port = 8000
const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/createUser', async (req, res) => {
  console.log(req.body)
  try {
      const user = new UsersModel(req.body)
      const cadastro = await user.save()
      return res.status(201).send({cadastro: cadastro})
  } catch (error) {
      return res.send({erro: "erro ao cadastrar"})
  }
})

app.post('/userLogin', async (req, res) => { 
try {
  const resp = await UsersModel.findOne({email: req.body.email, password: req.body.password})
  if(resp){
    let token = Math.round(Math.random() * 1000) + 1000
    console.log("resp :", resp)
    return res.send({message: 'encontrado', user: resp.name, token: token, permission: 'all'})
  }
  console.log('nao encontrado')
  return res.send({message: 'não encontrado'})
} catch (error) {
  return  res.status(400).send({ error: 'Failed to find' })
}
})

database().then(() => {
  app.listen(port, () => console.log(`API rodando na porta: ${port}`))
})


//app.listen(port, () => console.log(`API rodando na porta: ${port}`))