import { Rule } from "antd/es/form";
import { valueType } from "antd/es/statistic/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface ExternalStockItems {
  stockId: string;
  item: string | null;
}

export interface FieldConfig {
  name: string;
  label: string;
  noLabel?: boolean;
  type:
    | "text"
    | "email"
    | "password"
    | "confirmPassword"
    | "number"
    | "textarea"
    | "checkbox"
    | "date"
    | "money"
    | "select"
    | "dynamic"
    | "search";
  onSearch?: (value: string) => void;
  picker?: "week" | "month" | "quarter" | "year";
  defaultValue?: valueType | undefined;
  required?: boolean;
  rules?: Rule[];
  suffix?: string;
  options?: SelectOption[];
  onSelect?: (value: string) => void;
  dependencies?: string[];
  getValueFromDependency?: (values: Record<string, any> | undefined) => any;
  getMaxFromDependency?: (
    values: Record<string, any> | undefined
  ) => number | undefined;
  max?: number;
  min?: number;
  subFields?: FieldConfig[];
}
