"use client";

import { ComponentProps } from "react";
import { X, ChevronDown, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import {
  OptionsOrGroups,
  GroupBase,
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
} from "react-select";

const Select = dynamic(() => import("react-select"), { ssr: false });

const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});

const AsyncCreatableSelect = dynamic(
  () => import("react-select/async-creatable"),
  {
    ssr: false,
  }
);

interface MyOption {
  [key: string]: unknown;
}
type MyOptions = OptionsOrGroups<MyOption, GroupBase<MyOption>> | undefined;
type ReactSelectProps = ComponentProps<typeof Select>;
type ReactCreatableSelectProps = ComponentProps<typeof CreatableSelect>;
type ReactAsyncSelectProps = ComponentProps<typeof AsyncSelect>;
type ReactAsyncCreatableSelectProps = ComponentProps<
  typeof AsyncCreatableSelect
>;

const customClassNames = {
  menuList: "space-y-1",
  placeholder: "text-muted-foreground",
  control:
    "focus-visible:ring-[3px] selection:bg-primary selection:text-primary-foreground rounded-md bg-transparent dark:bg-input/30 border border-input p-2 text-base shadow-xs transition-[color,box-shadow] focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring max-h-32 overflow-y-scroll no-scrollbar ",
  menu: "bg-accent rounded-md px-4 py-2 shadow-md",
  clearIndicator:
    "text-destructive/50 hover:text-destructive/80 cursor-pointer",
  option: "hover:bg-accent-foreground/50 p-1 rounded",
  selectedOption: "bg-accent-foreground text-accent",
  dropdownIndicator: "text-foreground/50 cursor-pointer",
  multiValue: "bg-accent px-1 rounded-sm",
  valueContainer: "flex gap-2",
  multiValueRemove: "ml-1",
  groupHeading: "text-sm text-muted-foreground",
  areaInvalid:
    "focus-visible:ring-destructive/20 border-destructive dark:ring-destructive/40 focus-within:ring-destructive/20 focus-within:border-destructive dark:focus-within:ring-destructive/40",
  areaValid: "focus-visible:border-ring focus-visible:ring-ring/50",
  disabled: "opacity-50 cursor-not-allowed pointer-events-none",
};

function ReactSelect({
  classNames = {},
  options,
  components = {},
  ...selectProps
}: ReactSelectProps) {
  const {
    menuList,
    placeholder,
    control,
    menu,
    clearIndicator,
    option,
    dropdownIndicator,
    multiValue,
    valueContainer,
    multiValueRemove,
    groupHeading,
    ...otherClasses
  } = classNames;

  const {
    ClearIndicator,
    DropdownIndicator,
    LoadingIndicator,
    MultiValueRemove,
    ...otherComponents
  } = components;

  return (
    <Select
      unstyled={true}
      {...selectProps}
      options={options}
      components={{
        ClearIndicator: ClearIndicator || CustomClearIndicator,
        LoadingIndicator: LoadingIndicator || CustomLoadingIndicator,
        DropdownIndicator: DropdownIndicator || CustomDropdownIndicator,
        MultiValueRemove: MultiValueRemove || CustomMultiValueRemove,
        ...otherComponents,
      }}
      classNames={{
        control: (props) =>
          cn(
            customClassNames.control,
            props?.selectProps?.["aria-invalid"]
              ? customClassNames.areaInvalid
              : customClassNames.areaValid,
            props.selectProps.isDisabled ? customClassNames.disabled : "",
            control?.(props) && ""
          ),
        placeholder: (props) =>
          cn(customClassNames.placeholder, placeholder?.(props) && ""),
        menu: (props) => cn(customClassNames.menu, menu?.(props) && ""),
        menuList: (props) =>
          cn(customClassNames.menuList, menuList?.(props) && ""),
        option: (props) =>
          cn(
            customClassNames.option,
            props.isSelected ? customClassNames.selectedOption : "",
            option?.(props) && ""
          ),
        dropdownIndicator: (props) =>
          cn(
            customClassNames.dropdownIndicator,
            dropdownIndicator?.(props) && ""
          ),
        clearIndicator: (props) =>
          cn(customClassNames.clearIndicator, clearIndicator?.(props) ?? ""),
        valueContainer: (props) =>
          cn(customClassNames.valueContainer, valueContainer?.(props) ?? ""),
        multiValue: (props) =>
          cn(customClassNames.multiValue, multiValue?.(props) ?? ""),
        multiValueRemove: (props) =>
          cn(customClassNames.multiValue, multiValueRemove?.(props) && ""),
        groupHeading: (props) =>
          cn(customClassNames.groupHeading, groupHeading?.(props) ?? ""),
        ...otherClasses,
      }}
    />
  );
}

function ReactAsyncSelect({
  classNames = {},
  options,
  components = {},
  ...selectProps
}: ReactAsyncSelectProps) {
  const {
    menuList,
    placeholder,
    control,
    menu,
    clearIndicator,
    option,
    dropdownIndicator,
    multiValue,
    valueContainer,
    multiValueRemove,
    groupHeading,
    ...otherClasses
  } = classNames;

  const {
    ClearIndicator,
    DropdownIndicator,
    LoadingIndicator,
    MultiValueRemove,
    ...otherComponents
  } = components;

  return (
    <AsyncSelect
      unstyled={true}
      {...selectProps}
      options={options}
      components={{
        ClearIndicator: ClearIndicator || CustomClearIndicator,
        LoadingIndicator: LoadingIndicator || CustomLoadingIndicator,
        DropdownIndicator: DropdownIndicator || CustomDropdownIndicator,
        MultiValueRemove: MultiValueRemove || CustomMultiValueRemove,
        ...otherComponents,
      }}
      classNames={{
        control: (props) =>
          cn(
            customClassNames.control,
            props?.selectProps?.["aria-invalid"]
              ? customClassNames.areaInvalid
              : customClassNames.areaValid,
            props.selectProps.isDisabled ? customClassNames.disabled : "",
            control?.(props) && ""
          ),
        placeholder: (props) =>
          cn(customClassNames.placeholder, placeholder?.(props) && ""),
        menu: (props) => cn(customClassNames.menu, menu?.(props) && ""),
        menuList: (props) =>
          cn(customClassNames.menuList, menuList?.(props) && ""),
        option: (props) =>
          cn(
            customClassNames.option,
            props.isSelected ? customClassNames.selectedOption : "",
            option?.(props) && ""
          ),
        dropdownIndicator: (props) =>
          cn(
            customClassNames.dropdownIndicator,
            dropdownIndicator?.(props) && ""
          ),
        clearIndicator: (props) =>
          cn(customClassNames.clearIndicator, clearIndicator?.(props) ?? ""),
        valueContainer: (props) =>
          cn(customClassNames.valueContainer, valueContainer?.(props) ?? ""),
        multiValue: (props) =>
          cn(customClassNames.multiValue, multiValue?.(props) ?? ""),
        multiValueRemove: (props) =>
          cn(customClassNames.multiValue, multiValueRemove?.(props) && ""),
        groupHeading: (props) =>
          cn(customClassNames.groupHeading, groupHeading?.(props) ?? ""),
        ...otherClasses,
      }}
    />
  );
}

function ReactCreatableSelect({
  classNames = {},
  options,
  components = {},
  ...selectProps
}: ReactCreatableSelectProps) {
  const {
    menuList,
    placeholder,
    control,
    menu,
    clearIndicator,
    option,
    dropdownIndicator,
    multiValue,
    valueContainer,
    multiValueRemove,
    groupHeading,
    ...otherClasses
  } = classNames;

  const {
    ClearIndicator,
    DropdownIndicator,
    LoadingIndicator,
    MultiValueRemove,
    ...otherComponents
  } = components;

  return (
    <CreatableSelect
      unstyled={true}
      {...selectProps}
      options={options}
      components={{
        ClearIndicator: ClearIndicator || CustomClearIndicator,
        LoadingIndicator: LoadingIndicator || CustomLoadingIndicator,
        DropdownIndicator: DropdownIndicator || CustomDropdownIndicator,
        MultiValueRemove: MultiValueRemove || CustomMultiValueRemove,
        ...otherComponents,
      }}
      classNames={{
        control: (props) =>
          cn(
            customClassNames.control,
            props?.selectProps?.["aria-invalid"]
              ? customClassNames.areaInvalid
              : customClassNames.areaValid,
            props.selectProps.isDisabled ? customClassNames.disabled : "",
            control?.(props) && ""
          ),
        placeholder: (props) =>
          cn(customClassNames.placeholder, placeholder?.(props) && ""),
        menu: (props) => cn(customClassNames.menu, menu?.(props) && ""),
        menuList: (props) =>
          cn(customClassNames.menuList, menuList?.(props) && ""),
        option: (props) =>
          cn(
            customClassNames.option,
            props.isSelected ? customClassNames.selectedOption : "",
            option?.(props) && ""
          ),
        dropdownIndicator: (props) =>
          cn(
            customClassNames.dropdownIndicator,
            dropdownIndicator?.(props) && ""
          ),
        clearIndicator: (props) =>
          cn(customClassNames.clearIndicator, clearIndicator?.(props) ?? ""),
        valueContainer: (props) =>
          cn(customClassNames.valueContainer, valueContainer?.(props) ?? ""),
        multiValue: (props) =>
          cn(customClassNames.multiValue, multiValue?.(props) ?? ""),
        multiValueRemove: (props) =>
          cn(customClassNames.multiValue, multiValueRemove?.(props) && ""),
        groupHeading: (props) =>
          cn(customClassNames.groupHeading, groupHeading?.(props) ?? ""),
        ...otherClasses,
      }}
    />
  );
}

function ReactAsyncCreatableSelect({
  classNames = {},
  options,
  components = {},
  ...selectProps
}: ReactAsyncCreatableSelectProps) {
  const {
    menuList,
    placeholder,
    control,
    menu,
    clearIndicator,
    option,
    dropdownIndicator,
    multiValue,
    valueContainer,
    multiValueRemove,
    groupHeading,
    ...otherClasses
  } = classNames;

  const {
    ClearIndicator,
    DropdownIndicator,
    LoadingIndicator,
    MultiValueRemove,
    ...otherComponents
  } = components;

  return (
    <AsyncCreatableSelect
      unstyled={true}
      {...selectProps}
      options={options}
      components={{
        ClearIndicator: ClearIndicator || CustomClearIndicator,
        LoadingIndicator: LoadingIndicator || CustomLoadingIndicator,
        DropdownIndicator: DropdownIndicator || CustomDropdownIndicator,
        MultiValueRemove: MultiValueRemove || CustomMultiValueRemove,
        ...otherComponents,
      }}
      classNames={{
        control: (props) =>
          cn(
            customClassNames.control,
            props?.selectProps?.["aria-invalid"]
              ? customClassNames.areaInvalid
              : customClassNames.areaValid,
            props.selectProps.isDisabled ? customClassNames.disabled : "",
            control?.(props) && ""
          ),
        placeholder: (props) =>
          cn(customClassNames.placeholder, placeholder?.(props) && ""),
        menu: (props) => cn(customClassNames.menu, menu?.(props) && ""),
        menuList: (props) =>
          cn(customClassNames.menuList, menuList?.(props) && ""),
        option: (props) =>
          cn(
            customClassNames.option,
            props.isSelected ? customClassNames.selectedOption : "",
            option?.(props) && ""
          ),
        dropdownIndicator: (props) =>
          cn(
            customClassNames.dropdownIndicator,
            dropdownIndicator?.(props) && ""
          ),
        clearIndicator: (props) =>
          cn(customClassNames.clearIndicator, clearIndicator?.(props) ?? ""),
        valueContainer: (props) =>
          cn(customClassNames.valueContainer, valueContainer?.(props) ?? ""),
        multiValue: (props) =>
          cn(customClassNames.multiValue, multiValue?.(props) ?? ""),
        multiValueRemove: (props) =>
          cn(customClassNames.multiValue, multiValueRemove?.(props) && ""),
        groupHeading: (props) =>
          cn(customClassNames.groupHeading, groupHeading?.(props) ?? ""),
        ...otherClasses,
      }}
    />
  );
}

// custom components
function CustomClearIndicator(props: ClearIndicatorProps) {
  return (
    <components.ClearIndicator {...props}>
      <X size={18} />
    </components.ClearIndicator>
  );
}

function CustomDropdownIndicator(props: DropdownIndicatorProps) {
  const { selectProps } = props;
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown
        size={18}
        className={
          "transition-transform " + (selectProps.menuIsOpen ? "rotate-180" : "")
        }
      />
    </components.DropdownIndicator>
  );
}

function CustomLoadingIndicator() {
  return <Loader size={18} className="animate-spin" />;
}

function CustomMultiValueRemove(props: MultiValueRemoveProps) {
  return (
    <components.MultiValueRemove {...props}>
      <X size={14} className="hover:text-destructive cursor-pointer" />
    </components.MultiValueRemove>
  );
}

// helper functions
const map = new Map();

function flattenOptions(options: Exclude<MyOptions, undefined>): MyOption[] {
  const jsonOptions = JSON.stringify(options);
  if (map.has(jsonOptions)) {
    return map.get(jsonOptions) as MyOption[];
  }
  const flatOptions = options.flatMap((option) =>
    option.options ? option.options : option
  );
  map.set(jsonOptions, flatOptions);
  return flatOptions as MyOption[];
}

function convertToOptions(
  value: string[],
  options: Exclude<MyOptions, undefined>,
  valueField: string = "value"
) {
  const flatOptions = flattenOptions(options);
  const selectedOptions = value.map((v) => {
    return flatOptions.filter((o) => o[valueField] === v)[0];
  });

  return selectedOptions;
}

function convertToOption(
  value: string,
  options: Exclude<MyOptions, undefined>,
  valueField: string = "value"
) {
  if (!value) {
    return { [valueField]: "", label: "" };
  }
  const flatOptions = flattenOptions(options);
  return flatOptions.filter((o) => o[valueField] === value)[0];
}

function getFields(field: string, selectedOptions: MyOption[] | undefined) {
  if (selectedOptions) {
    return selectedOptions.map((so) => so[field]);
  }
  return [];
}

// exporting
export {
  ReactSelect,
  ReactAsyncSelect,
  ReactCreatableSelect,
  ReactAsyncCreatableSelect,
  convertToOptions,
  getFields,
  flattenOptions,
  convertToOption,
  type MyOption,
  type MyOptions,
};
