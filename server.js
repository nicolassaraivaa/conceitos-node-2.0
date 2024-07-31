import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/usuarios', async (req, res) =>{

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.post('/usuarios', async (req, res) =>{

    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
     })

     console.log(user)

    res.status(201).json({message: "Usuario criado com sucesso"})
})


app.put('/usuarios/:id', async (req, res) =>{

    const user = await prisma.user.update({
        where:{
            id: req.params.id
        },
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
     })

     console.log(user)

    res.status(201).json({message: "Usuario criado com sucesso"})
})

app.delete('/usuarios/:id', async (req, res) =>{
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json({message: "Usuário deletado com sucesso!"})
})

app.listen(port)

/* 
    nicolassaraivaa
    yShVFUJ2uOW9P8Os

    quando tem @unique significca que aquela informação não pode se repetir

    quando tem "?" significa que pode ou não preencher aquela informação, não é obrigatorio

*/