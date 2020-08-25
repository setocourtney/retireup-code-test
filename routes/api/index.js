const router = require("express").Router();
const sp500Routes = require("./sp500");


router.use("/sp500", sp500Routes);

module.exports = router;
