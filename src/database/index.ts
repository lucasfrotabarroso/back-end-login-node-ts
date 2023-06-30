import {DataSource} from 'typeorm'
import { User } from '../entities/User'

export const AppDataSource = new DataSource({
    type :"sqlite",
    database: './db.sqlite',
    entities: [
        User
    ],
    migrations : [
        "./src/database/migrations/*.ts"
    ],
    
})

AppDataSource.initialize()
.then(()=> {
    console.log("Data Source foi iniciado ")
})
.catch((error) => {
    console.error("Erro na inicialização do data source ", error)
})