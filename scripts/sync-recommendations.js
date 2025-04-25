const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputCSV = path.join(__dirname, '../data/Recommendations_Received.csv');
const outputJSON = path.join(__dirname, '../data/recommendations.json');
const results = [];

function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
}
function convertCsvToJson() {
    fs.createReadStream(inputCSV)
        .pipe(csv())
        .on('data', (data) => {
            try {
                const [datePart, timePart] = data['Creation Date'].split(', ');
                const [month, day, year] = datePart.split('/');

                const time24h = convertTo24Hour(timePart);
                const isoDate = new Date(`${20 + year}-${month}-${day}T${time24h}`).toISOString();

                results.push({
                    name: `${data['First Name']} ${data['Last Name']}`,
                    company: data.Company,
                    jobTitle: data['Job Title'],
                    text: data.Text.trim(),
                    date: isoDate,
                    status: data.Status,
                });
            } catch (error) {
                console.error('Error parsing row:', data, error.message);
            }
        })
        .on('end', () => {
            fs.writeFileSync(outputJSON, JSON.stringify(results, null, 2));
            console.log('✅ Testimonials synced to JSON.');
        });
}
convertCsvToJson();

