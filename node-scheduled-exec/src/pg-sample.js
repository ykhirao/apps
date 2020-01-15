const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


client.connect(err => {
  if (err) throw err;
  else {
    queryDatabase();
  }
});

function queryDatabase() {
  const query = `
        DROP TABLE IF EXISTS inventory;
        CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
        INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
        INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
        INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
    `;

  client
    .query(query)
    .then(() => {
      console.log('Table created successfully!');
      client.end(console.log('Closed client connection'));
    })
    .catch(err => console.log(err))
    .then(() => {
      console.log('Finished execution, exiting now');
      process.exit();
    });
}
