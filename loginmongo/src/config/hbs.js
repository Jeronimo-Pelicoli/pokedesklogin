import exphbs from "express-handlebars"
import path from "path"

const viewPath = path.resolve(__dirname, '..', 'views', 'emails')

export default {
    viewEngine: exphbs.create({
        layoutsDir: viewPath,
        partialsDir: path.resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs'
    }),
    viewPath,
    extName: '.hbs'
}