import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function DatasetDropDown() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(1);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetch("/api/datasets/list");
      const data = await response.json();
      setUsers(data);
      //   setUser(data[0]);
    }

    fetchMyAPI();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <InputLabel id="user-label">Dataset</InputLabel>
      <Select
        value={user}
        label="Dataset"
        labelId="user-label"
        onChange={handleChange}
      >
        {users.map((user, index) => (
          <MenuItem key={index} value={user.dataset_id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
