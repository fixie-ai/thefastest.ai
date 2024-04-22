
interface ValueFormatterParam {
  value: number;
}


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
	title: "Model",
	definition: "The LLM used."
};

export const ProviderDefinition = {
	title: "Provider",
	definition: "The cloud provider that is hosting the model."
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
	minWidth: 160,
	// tooltipField: "output"
};

const columnProvider = {
	field: "provider",
	headerName: ProviderDefinition.title,
	headerTooltip: ProviderDefinition.definition,
	headerClass: headerClass,
	minWidth: 130,
	maxWidth: 200,
};

// TTFT column
const columnTTFT = {
	field: "ttft",
	headerName: TTFTDefinition.title,
	headerTooltip: TTFTDefinition.definition,
	headerClass: headerClass,
	minWidth: 0,
	maxWidth: 120,
	valueFormatter: (p: ValueFormatterParam) => (p.value.toFixed(2) < 1.0 ? p.value.toFixed(2)*1000 + "ms" : p.value.toFixed(2) + "s"),
};

// TPS column
const columnTPS = {
	field: "tps",
	headerName: TPSDefinition.title,
	headerTooltip: TPSDefinition.definition,
	headerClass: headerClass,
	minWidth: 0,
	maxWidth: 120,
	valueFormatter: (p: ValueFormatterParam) => p.value.toFixed(2)
};

// Total Time column
const columnTotalTime = {
	field: "total_time",
	headerName: TotalTimeDefinition.title,
	headerTooltip: TotalTimeDefinition.definition,
	headerClass: headerClass,
	minWidth: 80,
	maxWidth: 120,
	// minWidth: 100,
	// maxWidth: 100,
	wrapHeaderText: true,
	// valueFormatter: (p: ValueFormatterParam) => p.value.toFixed(2) + "s",
	valueFormatter: (p: ValueFormatterParam) => (p.value.toFixed(2) < 1 ? p.value.toFixed(2)*1000 + "ms" : p.value.toFixed(2) + "s"),
	sort: 'asc',
};

export const gridOptionsBase = {
  // alwaysShowVerticalScroll: true,
  autoSizeStrategy: { type: 'fitGridWidth' },
	enableCellTextSelection: true,
  defaultColDef: {
	suppressMovable: true,
    filter: true,
    // minWidth: 80,	
  },
	domLayout: 'autoHeight',
  rowData: [],
  // Columns to be displayed (Should match rowData properties)...omit columnRegion, columnTTR, columnNumTokens
  columnDefs: [ columnProvider, columnModel, columnTTFT, columnTPS, columnTotalTime]
};