require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(express.static('src'));

app.get("/", (req, res) => {
	res.send(
		"<div style='color:blue; font-size:20px; font-style:bold'>Sportz-Interactive-Server</div>"
	);
});

// routes
app.use("/api/v1", require("./src/routes/countries"));

// error handling
const { notFound, errorHandling } = require("./src/errorHandler");

app.use(notFound);
app.use(errorHandling);

app.listen(port, () => {
	console.log(`Listning at port : ${port}`);
});
