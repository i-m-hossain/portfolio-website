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
                    "backendApiDevelopment":data['Backend & API Development'],
                    "frontendDevelopment":data['Frontend Development'],
                    "devOpsSystemAdministration":data['DevOps & System Administration'],
                    "database":data['Data Engineering & Automation'],
                    "dataEngineeringAutomation":data['Database'],
                    "otherTools":data['Other Tools'],
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

