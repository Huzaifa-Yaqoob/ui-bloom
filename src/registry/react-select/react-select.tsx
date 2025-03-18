"use client";

import { useMemo } from "react";
import { InputHTMLAttributes } from "react";
import { X, ChevronDown, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import {
  Props as SelectProps,
  OptionsOrGroups,
  GroupBase,
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  LoadingIndicatorProps,
  MultiValueRemoveProps,
} from "react-select";
import "./reactSelect.css";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface MyOptionType {
  value: string;
  label: string;
  [key: string]: any;
}

type MyOptions =
  | OptionsOrGroups<MyOptionType, GroupBase<MyOptionType>>
  | undefined;

type ReactSelectProps = Omit<
  SelectProps,
  "defaultValue" | "value" | "options" | "unstyled"
> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "value"> & {
    defaultValue?: SelectProps["defaultValue"] | string[] | string;
    value?: SelectProps["value"] | string[] | string;
    options: MyOptions;
  };

export default function ReactSelect({
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
    loadingIndicator,
    ...otherClasses
  } = classNames;

  const {
    ClearIndicator,
    DropdownIndicator,
    LoadingIndicator,
    MultiValueRemove,
    ...otherComponents
  } = components;

  const flatOptions = useMemo(() => {
    if (!options) {
      return undefined;
    }
    return flattenOptions(options);
  }, [options]);

  return (
    <Select
      {...selectProps}
      unstyled={true}
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
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "selection:bg-primary selection:text-primary-foreground",
            "rounded-md bg-transparent dark:bg-input/30 border border-input p-2 text-base shadow-xs transition-[color,box-shadow] focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring max-h-32 overflow-y-scroll no-scrollbar",
            control?.(props) && ""
          ),
        placeholder: (props) =>
          cn("text-muted-foreground", placeholder?.(props) && ""),
        menu: (props) =>
          cn("bg-accent rounded-md px-4 py-2 shadow-md", menu?.(props) && ""),
        menuList: (props) => cn("space-y-1", menuList?.(props) && ""),
        option: (props) =>
          cn(
            "hover:bg-accent-foreground/50 p-1 rounded",
            props.isSelected ? "bg-accent-foreground text-accent" : "",
            option?.(props) && ""
          ),
        dropdownIndicator: (props) =>
          cn(
            "text-foreground/50 cursor-pointer",
            dropdownIndicator?.(props) && ""
          ),
        clearIndicator: (props) =>
          cn(
            "text-destructive/50 hover:text-destructive/80 cursor-pointer",
            clearIndicator?.(props) ?? ""
          ),
        valueContainer: (props) =>
          cn("flex gap-2", valueContainer?.(props) ?? ""),
        multiValue: (props) =>
          cn("bg-accent px-1 rounded-sm", multiValue?.(props) ?? ""),
        multiValueRemove: (props) =>
          cn(
            "hover:text-destructive cursor-pointer ml-1",
            multiValueRemove?.(props) && ""
          ),
        groupHeading: (props) =>
          cn("text-sm text-muted-foreground", groupHeading?.(props) ?? ""),
        loadingIndicator: (props) => cn("", loadingIndicator?.(props) ?? ""),
        ...otherClasses,
      }}
    />
  );
}

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

function CustomLoadingIndicator(props: LoadingIndicatorProps) {
  return (
    <div {...props}>
      <Loader size={18} className="animate-spin" />
    </div>
  );
}

function CustomMultiValueRemove(props: MultiValueRemoveProps) {
  return (
    <components.MultiValueRemove {...props}>
      <X size={14} />
    </components.MultiValueRemove>
  );
}

function flattenOptions(options: Exclude<MyOptions, undefined>) {
  return options.flatMap((option) =>
    option.options ? option.options : option
  );
}
