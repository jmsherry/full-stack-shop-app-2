const app = require("./app");

const { PORT = 5000 } = process.env;

//controller
const controller = (req, res) => {
  // Model
  Tree.find().exec() 
}

// router
app.get('/trees', controller)

// NOTE: We do this for testing purposes, otherwise the server starts straight away
app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});