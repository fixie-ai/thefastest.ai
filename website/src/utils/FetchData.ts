export async function fetchLatestJsonFile(region: string, medium: string) {
  // Today's benchmark might not have run yet, so we'll try the previous benchmark as well.
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const p1 = fetchJsonFile(region, medium, today);
  const p2 = fetchJsonFile(region, medium, yesterday);
  const f1 = await p1;
  if (f1) {
    return f1;
  }
  return await p2;
}

export async function fetchJsonFile(
  region: string,
  medium: string,
  date: Date,
) {
  let dateStr = date.toISOString().slice(0, 10);
  const url = `https://storage.googleapis.com/thefastest-data/${region}/${medium}/${dateStr}.json`;
  return await fetchWithPostproc(url, postproc);
}

function postproc(item: any) {
  if (item.model.includes("/")) {
    [item.provider, item.model] = item.model.split("/");
  }
}

async function fetchWithPostproc(url: string, postproc: (item: any) => void) {
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  const json = await response.json();
  json.results.forEach(postproc);
  return json;
}
