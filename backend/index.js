const app = require("./app.js");

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`PORT is running at ${PORT}`);
});
