const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const { fetchDataAndSaveToDB } = require('./src/fetchData.js')

conn.sync({ alter: true }).then(() => {
server.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);

  await fetchDataAndSaveToDB();
})
}).catch(error => console.error(error))
