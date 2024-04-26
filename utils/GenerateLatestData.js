// Define the regions to search for files
const regions = ['cdg', 'sea', 'iad'];

// Function to fetch data from a given URL
async function fetchData(url) {
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

// Main function to fetch files from all regions and merge them
async function fetchAndMergeFiles(date) {
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
        return;
    }

    // Output the merged data to the console
    process.stdout.write(JSON.stringify(validResults, null, 2));
}

// Example usage with the current date
// const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
const currentDate = '2024-03-01';
fetchAndMergeFiles(currentDate);
