const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputCSV = path.join(__dirname, '../data/summary.csv');
const outputJSON = path.join(__dirname, '../data/summary.json');
const results = [];

function convertCsvToJson() {
    fs.createReadStream(inputCSV)
    .pipe(csv({
        mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '')}))
        .on('data', (data) => {
            try {
                results.push({
                    summary:data.summary,
                });
            } catch (error) {
                console.error('Error parsing row:', data, error.message);
            }
        })
        .on('end', () => {
            fs.writeFileSync(outputJSON, JSON.stringify(results, null, 2));
            console.log('✅ summary synced to JSON.');
        });
}
convertCsvToJson();

