const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputCSV = path.join(__dirname, '../data/experiences.csv');
const outputJSON = path.join(__dirname, '../data/experiences.json');
const results = [];


function convertCsvToJson() {
    fs.createReadStream(inputCSV)
        .pipe(csv({
            mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '')
        }))
        .on('data', (data) => {
            try {

                results.push({
                    "title": data.title,
                    "company": data.company,
                    "location": data.location,
                    "duration": data.duration,
                    "description": data.description,
                    "stack": data.stack
                });
            } catch (error) {
                console.error('Error parsing row:', data, error.message);
            }
        })
        .on('end', () => {
            fs.writeFileSync(outputJSON, JSON.stringify(results, null, 2));
            console.log('✅ experience synced to JSON.');
        });
}

convertCsvToJson();

