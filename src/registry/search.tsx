import * as React from "react";
import { IconSearch } from "./icons";
import { Input, type InputProps } from "./input";

export interface SearchProps extends Omit<InputProps, "type" | "prefix"> {
  /** Вызывается по Enter */
  onSearch?: (value: string) => void;
}

/** Поле поиска: Input с иконкой лупы, очисткой и поиском по Enter */
export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ onSearch, onKeyDown, placeholder = "Поиск", clearable = true, ...props }, ref) => (
    <Input
      ref={ref}
      type="search"
      role="searchbox"
      prefix={<IconSearch size={14} />}
      placeholder={placeholder}
      clearable={clearable}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSearch?.(e.currentTarget.value);
        onKeyDown?.(e);
      }}
      {...props}
    />
  ),
);
Search.displayName = "Search";
