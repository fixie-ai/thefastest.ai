
interface ValueFormatterParam {
  value: number;
}

export const WorstColor = {
	rgb: "239 68 68",
	hex: "#EF4444",
};

export const BestColor = {
	rgb: "34 197 94",
	hex: "#22C55E",
};


export const BenchmarkRegions = [
	{
		region: 'iad',
		label: 'US East (Virginia)',
		dateAdded: '2024-04-13',
	},
	{
		region: 'cdg',
		label: 'Europe (Paris)',
		dateAdded: '2024-04-13',
	},
	{
		region: 'sea',
		label: 'US West (Seattle)',
		dateAdded: '2024-04-13',
	},
];

export const ModelDefinition = {
	title: "Provider/Model",
	definition: "The LLM and host provider used."
};

export const RegionDefinition = {
	title: "Region",
	definition: "The region where the benchmark was run."
};

export const TTRDefinition = {
	title: "TTR",
	definition: "Time to (HTTP) Response. Indicates the overall speed of the serving infrastructure of the provider/model. Lower values = lower latency/faster performance."
};

export const TTFTDefinition = {
	title: "TTFT",
	definition: "Time To First Token. This is how quickly the model can process the incoming request and begin to output text, and translates directly into how quickly the UI starts to update. Lower values = lower latency/faster performance.",
	bestPerformance: 0.20,
	worstPerformance: 0.50,
};

export const TPSDefinition = {
	title: "TPS",
	definition: "Tokens Per Second. This is how quickly the model can produce text and controls how quickly the full response shows up in the UI. Higher values = more throughput/faster performance.",
	bestPerformance: 100,
	worstPerformance: 30,
};

export const TokensDefinition = {
	title: "Num Tokens",
	definition: "The total number of output tokens. Longer responses take longer to produce."
};

export const TotalTimeDefinition = {
	title: "Total",
	definition: "The total time from the start of the request until the response is complete, i.e., the last token has been generated. Total time = TTFT + TPS * Tokens. Lower values = lower latency/faster performance.",
	bestPerformance: 0.40,
	worstPerformance: 1.00,
};

// Set-up all of our column definitions that will be used in the Data Grid
const headerClass = "font-bold";

// Model column
const columnModel = {
	field: "model",
	headerName: ModelDefinition.title,
	headerTooltip: ModelDefinition.definition,
	headerClass: headerClass,
	//TODO: Make this ~200 on mobile screen size by default
	minWidth: 300,
	// tooltipField: "output"
};

// Region column
const columnRegion = {
	field: "region",
	headerName: RegionDefinition.title,
	headerTooltip: RegionDefinition.definition,
	headerClass: headerClass,
};

// TTR column
const columnTTR = {
	field: "ttr",
	headerName: TTRDefinition.title,
	headerTooltip: TTRDefinition.definition,
	headerClass: headerClass,
	valueFormatter: (p: ValueFormatterParam) => p.value.toFixed(2)
};

// TTFT column
const columnTTFT = {
	field: "ttft",
	headerName: TTFTDefinition.title,
	headerTooltip: TTFTDefinition.definition,
	headerClass: headerClass,
	minWidth: 100,
	// minWidth: 80,
	// maxWidth: 90,
	valueFormatter: (p: ValueFormatterParam) => (p.value.toFixed(2) < 1.0 ? p.value.toFixed(2)*1000 + "ms" : p.value.toFixed(2) + "s"),
};

// TPS column
const columnTPS = {
	field: "tps",
	headerName: TPSDefinition.title,
	headerTooltip: TPSDefinition.definition,
	headerClass: headerClass,
	minWidth: 100,
	// minWidth: 90,
	// maxWidth: 90,
	valueFormatter: (p: ValueFormatterParam) => p.value.toFixed(2)
};

// Tokens column
const columnNumTokens = {
	field: "num_tokens",
	headerName: TokensDefinition.title,
	headerTooltip: TokensDefinition.definition,
	headerClass: headerClass,
	// maxWidth: 100,
	wrapHeaderText: true
};

// Total Time column
const columnTotalTime = {
	field: "total_time",
	headerName: TotalTimeDefinition.title,
	headerTooltip: TotalTimeDefinition.definition,
	headerClass: headerClass,
	minWidth: 100,
	// minWidth: 100,
	// maxWidth: 100,
	wrapHeaderText: true,
	// valueFormatter: (p: ValueFormatterParam) => p.value.toFixed(2) + "s",
	valueFormatter: (p: ValueFormatterParam) => (p.value.toFixed(2) < 1 ? p.value.toFixed(2)*1000 + "ms" : p.value.toFixed(2) + "s"),
	sort: 'asc',
};

export const gridOptions = {
  // alwaysShowVerticalScroll: true,
  autoSizeStrategy: { type: 'fitGridWidth' },
	enableCellTextSelection: true,
  defaultColDef: {
    filter: true,
    // minWidth: 80,	
  },
	domLayout: 'autoHeight',
  rowData: [],
  // Columns to be displayed (Should match rowData properties)...omit columnRegion, columnTTR, columnNumTokens
  columnDefs: [ columnModel, columnTTFT, columnTPS, columnTotalTime]
};