const express =  require("express");
const cors =  require("cors");
const {NotFoundError} = require("./expressErrors");
const drugRoutes = require("./routes/drugs");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/drugs", drugRoutes);


// Error handler code goes here
/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
  });
  
/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

  module.exports = app;