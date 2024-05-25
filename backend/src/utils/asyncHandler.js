




export const asyncHandler = (fn) => async(req, res, next) =>{
    try {
       await  fn(req, res, next)
    } catch (error) {
        console.log(`Something went wrong while connecting express: ${error.message} `, error)
        res.status(500).json({message: 'Internal server error'})
    }
}