import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import rootStore from "@lib/store/rootStore";
// base mui
import { Alert, Box, Button, Grid, Typography } from "@mui/material";
// mui
import CircularProgress from "@mui/material/CircularProgress";
//custom
import TransferList from "@components/solve/TransferList";
import RedirectButton from "@components/generic/buttons/RedirectButton";

export default observer(function UserTransferList(props) {
  const { users, fieldName, form } = props;
  //   if (!onChange) throw Error("No onChange callback");

  const handleUserTransfer = (values) => {
    form.setFieldValue(fieldName, values);
  };

  //   const [checked, setChecked] = useState([]);
  if (users.length == 0) {
    return (
      <Alert severity="error">
        No users have been created.
        <RedirectButton url="/users/create" label="Create User" />
      </Alert>
    );
  }

  if (users.length > 0) {
    return (
      <TransferList
        id_field="user_id"
        label_field="name"
        items={users}
        onChange={handleUserTransfer}
      />
    );
  }

  return (
    <>
      <CircularProgress />
    </>
  );
});
