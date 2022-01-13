// const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database('sample.sqlite3')

// exports.index = async (req, res) => {
//   console.log('Get index')
//   db.serialize(function() {
//     db.all('SELECT id, text FROM todos', (err, rows) => {
//       if (err) res.send("エラー発生")
//       res.render("top", { rows })
//     });
//   })
// }

// exports.create = (req, res) => {
//   console.log('Post create')
//   const todo = req.body.todo.trim();

//   if (todo !== "") {
//     db.serialize(function() {
//       var stmt = db.prepare('INSERT INTO todos (text) VALUES (?)')
//       stmt.run(todo)
//       stmt.finalize()
//     })
//   }

//   res.redirect("/")
// }

// exports.store = (req, res) => {
//   console.log('Get store')
// }

// exports.show = (req, res) => {
//   console.log('Get show')
// }

// exports.edit = (req, res) => {
//   console.log('Get edit')
// }

// exports.update = (req, res) => {
//   console.log('Get update')
// }

// exports.destroy = (req, res) => {
//   console.log('Get destroy')
// }
