const { readStorage } = require('../utils/commonFuncs');
const { validateData } = require('../middlewares/countries');
const {
  getCountries,
  getSingleCountry,
  addCountry
} = require("../controller/countries");

const router = require("express").Router();

router.get("/countries", getCountries);
router.get("/country/:id", getSingleCountry);
router.post("/country", readStorage().single('image'), validateData, addCountry);

module.exports = router;
