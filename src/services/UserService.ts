import { AppDataSource } from "../database"
import { User } from "../entities/User"
import { UserRepository } from "../repositories/UserRepository"
import { sign } from "jsonwebtoken"
import { EmailService } from "./emailService"


export class UserService {
   private userRepository : UserRepository
   private emailService : EmailService
   
   
   constructor(
    emailService = new EmailService(),
    userRepository = new UserRepository(AppDataSource.manager)
   ){
    this.emailService = emailService
    this.userRepository = userRepository
   }

    
    createUser = async (name:string,email:string, password:string): Promise<User>=> {
        const user = new User(name,email,password) 
        this.emailService.sendEmail(email,"Registro","Usuario registrado","<b>Usuario criado com sucesso!!</b>")
        
        return this.userRepository.createUser(user)
        

    }

    getUser= async (userId:string):Promise <User | null>=> {
        
        return this.userRepository.getUser(userId)
        
    }

    getAuthenticateUser = async (email:string, password:string):Promise <User | null> => {
        return this.userRepository.getUserByEmailAndPassword(email,password)

    }

    getToken = async (email:string, password:string): Promise<string>=> {
        const user = await this.getAuthenticateUser(email,password)
        if(!user){
            throw new Error ("email ou senha invalido")
        }
        const tokenData = {
            name: user?.name,
            email: user?.email

        }
        const tokenKey = '123456789'

        const tokenOption = {
            subject: user?.id_user
        }
        const token = sign(tokenData,tokenKey,tokenOption)
        return token
    }

    
}