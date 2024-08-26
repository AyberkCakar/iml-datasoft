export interface IAlgorithm {
  id?: number;
  algorithmName: string;
}

export interface IAlgorithmsResult {
  algorithms: IAlgorithm[];
  algorithms_aggregate: {
    aggregate: { count: number };
  };
}
