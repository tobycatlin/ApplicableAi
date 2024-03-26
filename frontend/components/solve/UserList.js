import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

const UserList = ({ users }) => {
  return (
    <List>
      {users.map((user, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <Avatar src={user.avatarUrl} alt={user.name} />
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
          {index < users.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default UserList;
