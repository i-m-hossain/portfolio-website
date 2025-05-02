const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputCSV = path.join(__dirname, '../data/skills.csv');
const outputJSON = path.join(__dirname, '../data/skills.json');
const results = [];


function convertCsvToJson() {
    fs.createReadStream(inputCSV)
        .pipe(csv({
            mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '')
        }))
        .on('data', (data) => {
            try {

                results.push({
                    "backend":data['backend'],
                    "frontend":data['frontend'],
                    "devops":data['devops'],
                    "database":data['database'],
                    "dataEngineering":data['Database'],
                    "otherTools":data['otherTools'],
                });
            } catch (error) {
                console.error('Error parsing row:', data, error.message);
            }
        })
        .on('end', () => {
            fs.writeFileSync(outputJSON, JSON.stringify(results, null, 2));
            console.log('✅ Skills synced to JSON.');
        });
}

convertCsvToJson();

