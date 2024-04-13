interface ValueFormatterParam {
  value: number;
}

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
	definition: "Time to (HTTP) Response. Indicates the overall speed of the serving infrastructure of the provider/model."
};

export const TTFTDefinition = {
	title: "TTFT",
	definition: "Time to First Token. Time to get first text from the model. This translates directly into how quickly the UI starts to update when displaying the response and indicates the overall speed with which the model begins working on the request and processing the input tokens."
};

export const TPSDefinition = {
	title: "TPS",
	definition: "Tokens per Second. This is how quickly text is emitted from the model and translates directly into how quickly the UI finishes displaying the response. It also indicates how quickly the model can produce each output token."
};

export const TokensDefinition = {
	title: "Num Tokens",
	definition: "The total number of output tokens. Longer responses take longer to produce."
};

export const TotalTimeDefinition = {
	title: "Total Time",
	definition: "The total time from the start of the request until the response is complete, i.e., the last token has been generated. Total time = TTFT + TPS * Tokens."
};

// Set-up all of our column definitions that will be used in the Data Grid
const headerClass = "font-bold";

// Model column
const columnModel = {
	field: "model",
	headerName: ModelDefinition.title,
	headerTooltip: ModelDefinition.definition,
	headerClass: headerClass,
	minWidth: 400, 
	tooltipField: "output"
};

// Region column
const columnRegion = {
	field: "region",
	headerName: RegionDefinition.title,
	headerTooltip: RegionDefinition.definition,
	headerClass: headerClass,
	maxWidth: 100
};

// TTR column
const columnTTR = {
	field: "ttr",
	headerName: TTRDefinition.title,
	headerTooltip: TTRDefinition.definition,
	headerClass: headerClass,
	maxWidth: 90,
	valueFormatter: (p: ValueFormatterParam) => p.value.toFixed(2)
};

// TTFT column
const columnTTFT = {
	field: "ttft",
	headerName: TTFTDefinition.title,
	headerTooltip: TTFTDefinition.definition,
	headerClass: headerClass,
	maxWidth: 90,
	valueFormatter: (p: ValueFormatterParam) => p.value.toFixed(2)
};

// TPS column
const columnTPS = {
	field: "tps",
	headerName: TPSDefinition.title,
	headerTooltip: TPSDefinition.definition,
	headerClass: headerClass,
	maxWidth: 90,
	valueFormatter: (p: ValueFormatterParam) => p.value.toFixed(2)
};

// Tokens column
const columnNumTokens = {
	field: "num_tokens",
	headerName: TokensDefinition.title,
	headerTooltip: TokensDefinition.definition,
	headerClass: headerClass,
	minWidth: 100,
	maxWidth: 100,
	wrapHeaderText: true
};

// Total Time column
const columnTotalTime = {
	field: "total_time",
	headerName: TotalTimeDefinition.title,
	headerTooltip: TotalTimeDefinition.definition,
	headerClass: headerClass,
	minWidth: 100,
	maxWidth: 100,
	wrapHeaderText: true,
	valueFormatter: (p: ValueFormatterParam) => p.value.toFixed(2)
};

export const gridOptions = {
  alwaysShowVerticalScroll: true,
  autoSizeStrategy: { type: 'fitCellContents' },
  defaultColDef: {
    filter: true,
    minWidth: 80,
  },
  pagination: true,
  paginationPageSizeSelector: [50, 150, 500],
  paginationPageSize: 150,
  rowData: [],
  // Columns to be displayed (Should match rowData properties)
  columnDefs: [ columnModel, columnRegion, columnTTR, columnTTFT, columnTPS, columnNumTokens, columnTotalTime]
};