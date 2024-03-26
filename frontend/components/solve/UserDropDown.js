import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function UserDropDown() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(1);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetch("/api/users/list");
      const data = await response.json();
      setUsers(data);
      //   setUser(data[0]);
    }

    fetchMyAPI();
  }, []);
  //   users;
  console.log(users);
  return (
    <Box sx={{ minWidth: 120 }}>
      <InputLabel id="user-label">User</InputLabel>
      <Select
        value={user}
        label="User"
        labelId="user-label"
        onChange={handleChange}
      >
        {users.map((user, index) => (
          <MenuItem key={index} value={user.user_id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
