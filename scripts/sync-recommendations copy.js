const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputCSV = path.join(__dirname, '../data/recommendations.csv');
const outputJSON = path.join(__dirname, '../data/recommendations.json');
const results = [];


function convertCsvToJson() {
    fs.createReadStream(inputCSV)
        .pipe(csv({
            mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '')
        }))
        .on('data', (data) => {
            
            const rawDate = data['creationDate'];
            const formatted = convertToISOWithOffset(rawDate);
            
            try {

                results.push({
                    firstName: data['firstName'],
                    lastName: data['lastName'],
                    company: data.company,
                    jobTitle: data['jobTitle'],
                    text: data.text.trim(),
                    creationDate: formatted,
                    status: data.status,
                });
            } catch (error) {
                console.error('Error parsing row:', data, error.message);
            }
        })
        .on('end', () => {
            fs.writeFileSync(outputJSON, JSON.stringify(results, null, 2));
            console.log('✅ Recommendations synced to JSON.');
        });
}

function convertToISOWithOffset(rawDate) {
    // Replace (GMT+6) with a standard offset +0600 for parsing
    const cleaned = rawDate.replace(/\(GMT\+6\)/, "+0600");

    // Create the Date object
    const date = new Date(cleaned);

    // Get individual parts
    const pad = (num) => String(num).padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());

    // Format as ISO 8601 with +06:00
    return `${year}-${month}-${day}T${hour}:${minute}:${second}.000+06:00`;
}
convertCsvToJson();

