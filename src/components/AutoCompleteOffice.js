/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import AutoCompleteContext from "../context/AutoCompleteContext";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.office,
});

export default function FilterOffice({ data, onChange }) {
  const { setValue } = React.useContext(AutoCompleteContext);
  // const webcamRef = React.useRef(null);

  // const capture = React.useCallback(() => {
  //   const imageSrc = webcamRef.current;
  //   console.log(imageSrc);
  // }, [webcamRef]);

  return (
    <Autocomplete
      id="filter-demo"
      options={data}
      getOptionLabel={(option) => option.office}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          // label="Search for staff office"
          InputProps={{
            ...params.InputProps,
          }}
          variant="outlined"
          onChange={onChange}
          // ref={webcamRef}
        />
      )}
      onChange={(e) => {
        setValue(e.currentTarget.textContent);
      }}
    />
  );
}
