const { db } = require("./src/db.js");

const app = require("./src/app");

const PORT = 3001;

app.listen(PORT, () => {
   db.sync({ force: false });
   console.log(`in server http://localhost:${PORT}`); // eslint-disable-line no-console
});
