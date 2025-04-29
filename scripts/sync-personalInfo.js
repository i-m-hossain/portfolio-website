const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputCSV = path.join(__dirname, '../data/personalInfo.csv');
const outputJSON = path.join(__dirname, '../data/personalInfo.json');
const results = [];


function convertCsvToJson() {
    fs.createReadStream(inputCSV)
        .pipe(csv({
            mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '')
        }))
        .on('data', (data) => {
            try {

                results.push({
                    "name":data.name,
                    "title":data.title,
                    "phone":data.phone,
                    "email":data.email,
                    "github":data.github,
                    "linkedin":data.linkedin
                });
            } catch (error) {
                console.error('Error parsing row:', data, error.message);
            }
        })
        .on('end', () => {
            fs.writeFileSync(outputJSON, JSON.stringify(results, null, 2));
            console.log('✅ Personal info synced to JSON.');
        });
}

convertCsvToJson();

