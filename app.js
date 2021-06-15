const express = require('express')
const PORT = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const db = require('./config/db')
const path = require('path')
const bodyParser = require('body-parser')



//setup app
const app = express()

//create db conection
db.authenticate()
    .then(() => console.log('database connected'))
    .then()
    .catch(err => console.log(`rusak gan => ${err}`))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
    // app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.engine('handlebars', exphbs({
    helpers: {
        // Function to do basic mathematical operation in handlebar
        math: function(lvalue, operator, rvalue) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);
            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        }
    }
}))
app.set('view engine', 'handlebars')
    //allow access sub dir on view
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));

app.use('/', require('./routes/public'))
    // app.use('/admin', require('./routes/admin'))
app.use('/user', require('./routes/user'))
    // app.use('/barang', require('./routes/barang'))

//running app
app.listen(PORT, () => console.log(`App Running on port ${PORT}`))