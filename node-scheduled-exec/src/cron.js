const cron = require('node-cron');

console.log('cron.js is fired !!!')
cron.schedule('30 * * * * *', () => console.log(`Pass 30 sec by src/cron.js`));
