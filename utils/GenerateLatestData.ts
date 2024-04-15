//@ts-ignore
import { Storage } from '@google-cloud/storage';
//@ts-ignore
import * as fs from 'node:fs/promises';

// Define the regions to search for files
const regions = ['cdg', 'sea', 'iad'];
const bucketName = 'thefastest-data'; // The name of your GCS bucket
const destinationFileName = 'latest/text/latest.json'; // The destination file path in your GCS bucket

// Initialize the Google Cloud Storage client
const storage = new Storage();
const bucket = storage.bucket(bucketName);

// Where to save the merged data
const filePath = './website/public/data/latest.json';

// Function to fetch data from a given URL
async function fetchData(url: string): Promise<any> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('File not found');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}: ${error}`);
        return null;
    }
}

// Function to upload data to Google Cloud Storage
async function uploadToGCS(data: any) {
    const file = bucket.file(destinationFileName);
    await file.save(JSON.stringify(data, null, 2), {
        contentType: 'application/json',
    });
    console.log(`"latest.json" has been uploaded successfully to ${destinationFileName}.`);
}

async function saveData(data: string) {
    try {
        await fs.writeFile(filePath, data, 'utf-8');
        console.log(`File saved successfully at ${filePath}`);
    } catch (error) {
        console.error('Error saving file:', error);
    }
}

// Main function to fetch files from all regions and merge them
async function fetchAndMergeFiles(date: string | undefined) {
    if (!date) {
        console.error('Invalid date provided.');
        return;
    }
    
    const baseUrl = 'https://storage.googleapis.com/thefastest-data';
    const promises = regions.map(region => fetchData(`${baseUrl}/${region}/text/${date}.json`));
    const results = await Promise.all(promises);

    // Filter out any null results (files not found)
    const validResults = results.filter(result => result !== null);

    // If no files were found, do not update "latest.json"
    if (validResults.length === 0) {
        console.log('No files found for the given date. "latest.json" will not be updated.');
        return;
    }

    await saveData(JSON.stringify(validResults, null, 2));

    // Upload the merged results to Google Cloud Storage
    // await uploadToGCS(validResults);
}

// Example usage with the current date
const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
console.log(`Fetching and merging files for date: ${currentDate}`);
fetchAndMergeFiles(currentDate);
