import { Response, Request } from "express";
import {UserService} from '../services/UserService'


export class UserController {
    userService :UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (req:Request, res:Response)=>{
        
        const user = req.body
        if (!user.name || !user.email || !user.password){
            return res.status(400).json ({message:'dados invalidos'})
        }
        this.userService.createUser(user.name,user.email,user.password)
        return res.status(201).json({message:'Usuario criado'})

    }

    getUser = async (req:Request,res:Response) => {
        const {id_user} = req.params
        const user = await this.userService.getUser(id_user)
        return res.status(200).json({
            id_user : user?.id_user,
            name:user?.name,
            email: user?.email
        })
    }
    deleteUser= (req:Request, res: Response)=> {
        const user = req.body
        console.log('deletando usuario... ', user)
        return res.status(200).json({message: 'usuario deletado'})
    }
    
}