export type TTypeFields = "string" | "number";

export interface IAddItem {
  name: string;
  type: TTypeFields;
  placeholder: string;
  options?: object;
}
