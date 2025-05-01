const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputCSV = path.join(__dirname, '../data/certifications.csv');
const outputJSON = path.join(__dirname, '../data/certifications.json');
const results = [];


function convertCsvToJson() {
    fs.createReadStream(inputCSV)
        .pipe(csv({
            mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '')
        }))
        .on('data', (data) => {
            try {

                results.push({
                    "certificationName":data.certificationName,
                    "certificationLink":data.certificationLink,
                    "issued":data.issued,
                    "credentialId":data.credentialId,
                    "issuedBy":data.issuedBy
                });
            } catch (error) {
                console.error('Error parsing row:', data, error.message);
            }
        })
        .on('end', () => {
            fs.writeFileSync(outputJSON, JSON.stringify(results, null, 2));
            console.log('✅ Certifications synced to JSON.');
        });
}

convertCsvToJson()
