




export const asyncHandler = (fn) => async(req, res, next) =>{
    try {
        fn(req, res, next)
    } catch (error) {
        console.log(`Something went wrong while connecting express: ${error.message}`)
        res.staus(500).json({message: 'Internal server error'})
    }
}