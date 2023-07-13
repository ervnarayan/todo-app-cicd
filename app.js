import express from 'express';
import { PORT } from './config';
import  bodyParser  from 'body-parser';
import  methodOverride  from 'method-override';
import  sanitizer  from 'sanitizer';
import path from 'path';

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));


app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        console.log(`check ${method}`);
        return method
    }
}));

let todolist = [];

app.get('/', function (req, res) {
    res.render('index.ejs', {
        todolist,
        clickHandler: "func1();"
    });
})

app.post('/add/', function (req, res) {
    let newTodo = sanitizer.escape(req.body.newtodo);
    if (req.body.newtodo != '') {
        todolist.push(newTodo);
    }
    res.redirect('/');
})

app.get('/delete/:id', function (req, res) {
    if (req.params.id != '') {
        todolist.splice(req.params.id, 1);
    }
    res.redirect('/');
})

app.get('/:id', function (req, res) {
    let todoIdx = req.params.id;
    let todo = todolist[todoIdx];
    if (todo) {
        res.render('edititem.ejs', {
            todoIdx,
            todo,
            clickHandler: "func1();"
        });
    } else {
        res.redirect('/');
    }
})

app.put('/edit/:id', function (req, res) {
    let todoIdx = req.params.id;
    let editTodo = sanitizer.escape(req.body.editTodo);
    if (todoIdx != '' && editTodo != '') {
        todolist[todoIdx] = editTodo;
    }
    res.redirect('/');
})

app.use(function (req, res, next) {
    res.redirect('/todo');
})

app.listen(PORT, ()=>{
    console.log(`Todo App is listening on PORT ${PORT}...`);
});
