import { Box, TextField, InputAdornment, Select, MenuItem, OutlinedInput, FormControl, InputLabel } from "@mui/material";
import { useRef, useState } from "react";
import { Search as SearchIcon } from "@icons/search";

type Options = {
  options: {
    label: string;
    value: string;
  }[];
} | {
  column: string;
} | {};

type Props = {
  label?: string;
  placeholder?: string;
  onSearch?: (query: string, target: string) => void;
  onChange?: (query: string, target: string) => void;
} & Options;

export default function SearchBoxDropdown({
  label = "Search",
  placeholder,
  onSearch,
  onChange,
  ...props
}: Props) {

  const searchText = useRef<HTMLInputElement>();

  const [searchTarget, setSearchTarget] = useState(
    "column" in props ? props.column :
      "options" in props ? props.options[0].value : ""
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >

      {"options" in props &&
        <FormControl>
          <InputLabel id="search-in-label">Search In</InputLabel>
          <Select
            labelId="search-in-label"
            label="Search In"
            name="target"
            onChange={(e) => setSearchTarget(e.target.value)}
            value={searchTarget}
            size="small"
            input={<OutlinedInput label="Search In" />}
          >
            {
              props.options.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      }
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          onSearch?.(searchText.current?.value ?? "", searchTarget);
        }}
        sx={{ flexGrow: 1 }}
      >
        <TextField
          label={label}
          placeholder={placeholder ?? label}
          fullWidth
          size="small"
          onChange={(e) => onChange?.(e.target.value, searchTarget)}
          inputProps={{ ref: searchText }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            autoFocus: true,
          }}
        />
      </Box>
    </Box>
  );
}