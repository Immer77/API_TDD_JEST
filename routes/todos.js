const express = require('express');
const router = express.Router();
const createError = require('http-errors');

// Eksemplet her kunne pulles fra en database.
const todos = [{ id: 1, name: 'Do something', completed: false }]

/* GET todos listing. */
// /todos
router.get('/', function (req, res, next) {
    res.json(todos);
});

router.get('/:id', function (req, res, next) {
    let foundTodo = todos.find(todo => todo.id === Number(req.params.id));

    if(!foundTodo){
        return next(createError(422, `${req.params.id} Does not exist`));
    }
      
    res.json(foundTodo);
})

router.post('/', function(req,res,next){
    // For at få vores post information skal vi have den fra request bodyen
    const {body} = req;

    if(typeof body.name !== 'string'){
        return next(createError(422, "Unprocessable Entity"));
    }

    // Laver vi en ny todo
    const newTodo = {
        id: todos.length + 1,
        name: body.name,
        completed: false
    }

    
    // Tilføjer den til listen af todos.
    todos.push(newTodo);

    res.status(201).json(newTodo);
})

module.exports = router;
