/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import AutoCompleteContext from "../context/AutoCompleteContext";

export default function Filter({ data, onChange }) {
  const { setId } = React.useContext(AutoCompleteContext);

  React.useEffect(() => {
    console.log(
      data.map((data) => {
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              setId(data._id);
            }}
          ></button>
        );
      })
    );
  }, [data, onChange, setId]);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.fullname,
    // setId: (option) => setId(option._id),
  });
  return (
    <Autocomplete
      id="filter-demo"
      options={data}
      getOptionLabel={(option) => option.fullname}
      filterOptions={filterOptions}
      //   style={{ width: 300 }}
      renderInput={(params) => (
        <>
          <TextField
            {...params}
            label="Search for Staff"
            variant="outlined"
            onChange={onChange}
          />
        </>
      )}
      onChange={(e) => {
        console.log(e.currentTarget);
      }}
    />
  );
}
