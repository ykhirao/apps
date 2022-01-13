

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data.sqlite3')

db.serialize(function() {
  console.log("SEED is run!!!!!!!")
  db.run('DROP TABLE IF EXISTS todos;');
  db.run(`CREATE TABLE todos(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      completed INTEGER,
      created_at TEXT DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'localtime'))
    );`);

    var stmt = db.prepare('INSERT INTO todos (text, completed) VALUES (?, ?)')

    const todos = [
      { text: "洗濯物（サンプル）", completed: 0 },
      { text: "食器洗い（サンプル）", completed: 1 },
      { text: "プログラミング（サンプル）", completed: 0 },
    ];

    todos.forEach(todo => {
      stmt.run(todo.text, todo.completed)
    });
  
    stmt.finalize()
})
