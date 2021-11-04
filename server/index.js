// require("dotenv").config({ // <-- multiple .env files
//   path: `.env.${process.env.NODE_ENV}`,
// });
require('dotenv').config();
const app = require("./app");

const { PORT = 5000 } = process.env;

// NOTE: We do this for testing purposes, otherwise the server starts straight away
const server = app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});

console.log({ server });

process.on("uncaughtException", (err) => {
  // Honeybadger.notify(error); // log the error in a permanent storage
  // attempt a gracefully shutdown
  server.close(() => {
    process.exit(1); // then exit
  });

  // If a graceful shutdown is not achieved after 1 second,
  // shut down the process completely
  setTimeout(() => {
    process.abort(); // exit immediately and generate a core dump file
  }, 1000).unref();
});

process.on("unhandledRejection", (reason, promise) => {
  // Honeybadger.notify({
  //   message: 'Unhandled promise rejection',
  //   params: {
  //     promise,
  //     reason,
  //   },
  // });
  server.close(() => {
    process.exit(1);
  });

  setTimeout(() => {
    process.abort();
  }, 1000).unref();
});
