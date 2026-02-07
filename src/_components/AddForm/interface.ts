export type TTypeFields = "string" | "number" | "date";

export interface IAddItem {
  name: string;
  type: TTypeFields;
  placeholder: string;
  options?: object;
}
