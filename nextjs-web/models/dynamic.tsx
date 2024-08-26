export interface IDynamic {
  [key: string]: string | number | IDynamic;
}
