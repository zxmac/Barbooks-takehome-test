export interface Paging {
  limit: number;
  offset: number;
}

export interface ParamFilter extends Paging {
  product: string;
}