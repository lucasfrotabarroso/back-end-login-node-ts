import express, {Request, Response} from 'express'
import {UserController} from './constrollers/UserController'
import { router } from './routes'
import "reflect-metadata"
import { AppDataSource } from './database'

const server = express()



server.use(express.json())
server.use(router)

server.get('/',(req:Request, res:Response)=> {
    return res.status(200).json({message:"DioBank API"})
})

server.listen(5001,()=> console.log('server on'))