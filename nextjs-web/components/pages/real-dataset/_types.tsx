export interface IRealDataset {
  id?: number;
  datasetName: string;
}

export interface IRealDatasetsResult {
  real_datasets: IRealDataset[];
  real_datasets_aggregate: {
    aggregate: { count: number };
  };
}
