import { Field, useFormikContext } from "formik";
import { ComponentProps, Fragment } from "react";
import RadioButton from "./RadioButton";

type TextInputInputProps = Omit<ComponentProps<typeof Field>, "type"> & {
  label?: string;
  widget?: "default" | "radioButton";
  options?: { label: string; value: string }[];
};

export const InputField = (inputProps: TextInputInputProps) => {
  const { name, label, widget = "default", options } = inputProps;
  const { getFieldProps, setFieldValue, setFieldTouched } = useFormikContext();
  const { value, onBlur } = getFieldProps<string>(name);
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-primary-default"
        >
          {label}
        </label>
      )}
      {widget === "default" && (
        <Field
          {...inputProps}
          value={value ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValue(name, e.target.value);
            setFieldTouched(name, true);
          }}
          onBlur={onBlur}
          className="text-sm w-full bg-white py-2 px-3 rounded-md outline-none border border-gray-300 focus:border-primary-default focus:ring-2 focus:ring-primary-default focus:ring-offset-1"
        />
      )}
      {widget === "radioButton" && (
        <div className={"flex flex-wrap sm:flex-nowrap w-full  gap-2"}>
          {options?.map((option) => (
            <RadioButton
              key={option.value}
              content={option.label}
              name={option.label}
              value={option.value}
              selected={option.value === value}
              onChange={(value) => {
                setFieldValue(name, value);
                setFieldTouched(name, true);
              }}
              wrapperClassName="min-w-min !w-auto !py-2 text-sm"
            />
          ))}
        </div>
      )}
    </div>
  );
};
