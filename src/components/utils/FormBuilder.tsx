import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  InputNumber,
  Space,
} from "antd";
import { FieldConfig } from "../../types/comps";
import { CloseOutlined } from "@ant-design/icons";

// const { Option } = Select;
const { Search } = Input;

interface FormBuilderProps {
  formConfig: FieldConfig[];
  onSubmit: (values: any) => void;
  loading?: boolean;
  columns?: 1 | 2;
  onChange?: (changedValues: any) => void;
  styles?: React.CSSProperties;
  showSubmitButton?: boolean;
  fullWidthButton?: boolean;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  formConfig,
  onSubmit,
  loading = false,
  columns = 1,
  onChange = () => null,
  styles = {},
  showSubmitButton = true,
  fullWidthButton = false,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const validatedValues = { ...values };

    formConfig.forEach((field) => {
      if (field.type === "number" && field.max !== undefined) {
        if (validatedValues[field.name] > field.max) {
          validatedValues[field.name] = field.max;
        }
      }
    });

    onSubmit(validatedValues);
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    formConfig.forEach((field) => {
      if (field.dependencies) {
        const dependencyValues = field.dependencies.reduce(
          (acc, dependency) => ({
            ...acc,
            [dependency]: allValues[dependency],
          }),
          {}
        );

        if (field.getValueFromDependency) {
          const newValue = field.getValueFromDependency(dependencyValues);
          if (form.getFieldValue(field.name) !== newValue) {
            form.setFieldsValue({
              [field.name]: newValue,
            });
          }
        }

        if (field.getMaxFromDependency) {
          const newMax = field.getMaxFromDependency(dependencyValues);
          const currentValue = form.getFieldValue(field.name);
          if (newMax && currentValue > newMax) {
            form.setFieldsValue({
              [field.name]: newMax,
            });
          }
          field.max = newMax; // Update the max property for rendering
        }
      }
    });
    onChange(changedValues);
  };

  const renderFormField = (field: FieldConfig) => {
    switch (field.type) {
      case "textarea":
        return (
          <Input.TextArea
            defaultValue={field.defaultValue}
            rows={5}
            placeholder={field.label}
          />
        );
      case "checkbox":
        return <Checkbox>{field.label}</Checkbox>;
      case "select":
        return (
          <Select
            defaultValue={field.defaultValue}
            placeholder={field.label}
            showSearch
            //@ts-ignore
            onSelect={field.onSelect || (() => null)}
            optionFilterProp="label"
            style={{ minWidth: 200 }}
            options={field.options || []}
          >
            {/* {Array.isArray(field.options) &&
              field.options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))} */}
          </Select>
        );
      case "date":
        return (
          <DatePicker
            picker={field.picker}
            defaultValue={field.defaultValue}
            style={{ width: "100%" }}
            // format="YYYY-MM-DD"
          />
        );
      case "money":
        return (
          <InputNumber
            defaultValue={field.defaultValue}
            placeholder={field.label}
            max={field.max}
            controls={false}
            prefix="₦"
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
          />
        );
      case "number":
        return (
          <InputNumber
            defaultValue={field.defaultValue}
            placeholder={field.label}
            max={field.max}
            controls={false}
            suffix={field.suffix || ""}
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
          />
        );
      case "search":
        return (
          <Search
            defaultValue={field.defaultValue}
            placeholder={field.label}
            onSearch={field.onSearch || (() => null)}
          />
        );
      case "password":
        return (
          <Input.Password
            name={field.name}
            placeholder="Confirm Your Password"
          />
        );
      // case "confirmPassword":
      //   return (
      //     <Input.Password
      //       name={field.name}
      //       placeholder="Confirm Your Password"
      //     />
      //   );
      default:
        return (
          <Input
            defaultValue={field.defaultValue}
            placeholder={field.label}
            type={field.type}
          />
        );
    }
  };

  return (
    <Form
      preserve={false}
      form={form}
      onFinish={onFinish}
      layout="vertical"
      onValuesChange={handleValuesChange}
    >
      <div
        style={styles}
        className={`grid ${
          columns === 1 ? "" : "md:grid-cols-2"
        } grid-cols-1 gap-x-3`}
      >
        {formConfig.map((field) => {
          if (field.type === "dynamic")
            return (
              <Form.Item label={!field.noLabel && field.label}>
                <Form.List name={[field.name]}>
                  {(subFields, subOpt) => (
                    <div
                      className="p-5 border rounded bg-gray-50"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: 16,
                      }}
                    >
                      {subFields.map((subField) => (
                        <Space key={subField.key}>
                          {field.subFields?.map((field) => (
                            <Form.Item
                              className="w-full"
                              key={field.name}
                              name={[subField.name, field.name]}
                              label={!field.noLabel && field.label}
                              rules={[
                                {
                                  required: field.required || false,
                                  message: `${field.label} is required`,
                                },
                                ...(field.rules || []),
                              ]}
                            >
                              {renderFormField(field)}
                            </Form.Item>
                          ))}
                          <CloseOutlined
                            onClick={() => {
                              subOpt.remove(subField.name);
                            }}
                          />
                        </Space>
                      ))}
                      <Button type="dashed" onClick={() => subOpt.add()} block>
                        + Add Item
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Form.Item>
            );

          return (
            <Form.Item
              key={field.name}
              name={field.name}
              label={!field.noLabel && field.label}
              rules={[
                {
                  required: field.required || false,
                  message: `${field.label} is required`,
                },
                ...(field.rules || []),
              ]}
            >
              {renderFormField(field)}
            </Form.Item>
          );
        })}
      </div>
      <Form.Item style={{ display: !showSubmitButton ? "none" : "block" }}>
        <Button
          style={fullWidthButton ? { width: "100%" } : undefined}
          type="primary"
          htmlType="submit"
          loading={loading}
          size="large"
          className="uppercase"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormBuilder;
