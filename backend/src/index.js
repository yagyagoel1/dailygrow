import dotenv from 'dotenv'
import app from './app.js'

dotenv.config({path: '../.env'})

try{
    app.on('error', (error) => {
        throw error;

    })
    app.listen(process.env.PORT||3000, () => {
        console.log(`Server is running on port: ${process.env.PORT}`)
    })
}
catch(error){
    console.log(`Something went wrong while connecting express: ${error.message}`)
}