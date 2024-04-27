// Define the regions to search for files
const regions = ["cdg", "sea", "iad"];

// Function to fetch data from a given URL
async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

// Main function to fetch files from all regions and merge them
async function fetchAndMergeFiles(date) {
  const baseUrl = "https://storage.googleapis.com/thefastest-data";
  const promises = regions.map((region) =>
    fetchData(`${baseUrl}/${region}/text/${date}.json`)
  );
  const results = await Promise.all(promises);
  process.stdout.write(JSON.stringify(results, null, 2));
}

// Example usage with the current date
const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
try {
  fetchAndMergeFiles(currentDate);
} catch (error) {
  console.error(error);
  process.exit(1);
}
