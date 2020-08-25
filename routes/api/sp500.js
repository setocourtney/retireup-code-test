// --- ROUTES FOR S&P500 INDEX RETURN DATA API ---

const router = require("express").Router();
const sp500API = require("../../controllers/sp500");

// api/sp500
router.route("/")
  .get(sp500API.getReturns);

module.exports = router;
