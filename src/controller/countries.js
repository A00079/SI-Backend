
const { readFileAsync } = require('../utils/commonFuncs');
const path = require('path');
const fs = require('fs');

module.exports = {
    getCountries: async (req, res, next) => {
        try {
            const countriesData = await readFileAsync('countries.json');
            const newCountries = countriesData.countries.map(({ id, name }) => ({ id, name }));
            res.status(201).json({
                status: "success",
                message: "Countries fetched successfully",
                result: newCountries
            });
        } catch (error) {
            next(error);
        }
    },
    getSingleCountry: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid country ID. Please provide a valid number.' });
                return;
            }
            const countriesData = await readFileAsync('countries.json');
            const country = countriesData.countries.find((country) => country.id == id);
            res.status(201).json({
                status: "success",
                message: "Country fetched successfully",
                result: country
            });
        } catch (error) {
            next(error);
        }
    },
    addCountry: async (req, res, next) => {
        try {
            const image = req.file;
            const { id, name, continent, rank } = req.body;
            // const imagePath = image.path.replace(/\\/g, '/');
            const filePath = path.join(__dirname, '..');
            const countriesData = await readFileAsync('countries.json');
            countriesData.countries.push(
                {
                    id,
                    name,
                    continent,
                    "flag": image.filename,
                    rank
                }
            );
            fs.writeFile(filePath + '/' + 'countries.json', JSON.stringify(countriesData), 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error writing data to file.' });
                }

                return res.status(200).json({
                    message: 'Data received successfully.',
                });
            });
        } catch (error) {
            next(error);
        }
    },
};
