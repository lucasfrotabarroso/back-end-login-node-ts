import {  UserService } from "./UserService"

jest.mock("../repositories/UserRepository"
)
jest.mock('../database', ()=>{
    initialize: jest.fn()
})
const mockUserRepository = require("../repositories/UserRepository")

describe ('UserService', () => {
    const userService = new UserService(mockUserRepository)
    

    it ('Deve adicionar um novo usuario', async ()=> {
        mockUserRepository.createUser = jest.fn().mockImplementation(()=> Promise.resolve(
            {
                id_user: "nath",
                email: "nath@test.com",
                password:"123456"
            }
        ))
       const response =  await userService.createUser('nath','nath@teste.com', "12345");
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user: "nath",
            email: "nath@test.com",
            password:"123456"
        })
    })
})