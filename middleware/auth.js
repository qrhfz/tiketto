module.exports = {
    adminAuth: async(req, res, next) => {
        try {
            if (await !req.cookies.token) {
                res.redirect('/login')
            } else {
                next()
            }
        } catch (error) {
            console.log(error)
        }
    },
    userAuth: async(req, res, next) => {
        try {
            if (await !req.cookies.token) {
                res.redirect('/login')
            } else {
                next()
            }
        } catch (error) {
            console.log(error)
        }
    }
}