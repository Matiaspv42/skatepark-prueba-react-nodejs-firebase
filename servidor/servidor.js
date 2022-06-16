const express= require('express');
const app = express();

var cors = require('cors')
app.use(cors())

const jwt = require('jsonwebtoken')
const secretKey = 'secreto'
const tiempoDeExpiracionToken = 1000

const {getSkaters,registerSkater, updateSkater, deleteSkater, loginSkater, approveSkater} = require('./consultas')

const port = 3001



app.listen(port, ()=>{
    console.log(`Servidor andando en puerto ${port}`)
})

app.use(express.json())


app.get('/skaters', async(req,res)=>{
    try{          
        const skaters = await getSkaters()

        res.json(skaters)
 }
     catch(error){
      res.status(error.code).send(error)
     }
  })
  

app.post('/skaters', (req,res)=>{
    try {        
        const skater = req.body

        registerSkater(skater)
        res.send('ok')
    } catch (error) {
        res.status(error.code).send(error)
    }
})

app.put('/skaters',(req,res)=>{
    try {

        const Authorization = req.header('Authorization')
        if(!Authorization) throw {code:400, message: 'Falta el token'}
        const token = Authorization.split("Bearer ")[1]
        jwt.verify(token, secretKey, async (error, decoded)=>{
            if(error) res.status(500).json({error:'Token invalido'})
            if(decoded){
            const skater = req.body
            updateSkater(skater)
            res.send('updated')
            }
    })} catch (error) {
        res.status(error.code).send(error)
    }
})

app.put('/aprobarSkater',(req,res)=>{
    try {
        const Authorization = req.header('Authorization')
        if(!Authorization) throw {code:400, message: 'Falta el token'}
        const token = Authorization.split("Bearer ")[1]
        jwt.verify(token, secretKey, async (error, decoded)=>{
            if(error) res.status(500).json({error:'Token invalido'})
            if(decoded){
            const id = req.body[0]
            approveSkater(id)
            res.send('approved')
            }
    })} catch (error) {
        res.status(error.code).send(error)
    }
})

app.delete('/skaters/:email', (req,res)=>{
    try {
        const {email} = req.params
        deleteSkater(email)
        res.send('deleted')
    } catch (error) {
        res.status(error.code).send(error)
    }
})

// ruta login

app.post('/login', async(req,res)=>{
    try {
        const skaterLoginData = req.body;
        const respuesta =await loginSkater(skaterLoginData)
        if(respuesta?.error){res.send(respuesta.error)}
        else{
            const id = respuesta[0].id
            const token = jwt.sign({id}, secretKey,{
                expiresIn:tiempoDeExpiracionToken,
            })
            res.json({auth:true, token, respuesta})
        }
    } catch (error) {
        res.status(error.code).send(error)
    }
})