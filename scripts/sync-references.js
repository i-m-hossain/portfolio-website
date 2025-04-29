const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputCSV = path.join(__dirname, '../data/references.csv');
const outputJSON = path.join(__dirname, '../data/references.json');
const results = [];

function convertCsvToJson() {
    fs.createReadStream(inputCSV)
    .pipe(csv({
        mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '')}))
        .on('data', (data) => {
            try {
                results.push({
                    name:data.name,
                    title:data.title,
                    email:data.email,
                    phone:data.phone
                });
            } catch (error) {
                console.error('Error parsing row:', data, error.message);
            }
        })
        .on('end', () => {
            fs.writeFileSync(outputJSON, JSON.stringify(results, null, 2));
            console.log('✅ references synced to JSON.');
        });
}
convertCsvToJson();

