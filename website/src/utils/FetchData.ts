export async function fetchLocalJsonFile(url: string) {
  try {
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json(); 
    json.forEach(postproc);      
    return json;
  } catch (error) {
    console.error('Error fetching JSON file:', error);
  }
}

function postproc(obj: any) {  
  obj.results.forEach((item: any) => {
    if (item.model.includes("/")) {
      [ item.provider, item.model ] = item.model.split("/");        
    }
  });
}
