import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import rootStore from "@lib/store/rootStore";

export default observer(function DataSetTransferList(props) {
  const { items, id_field = "user_id", label_field = "name" } = props;
  const [checked, setChecked] = useState([]);

  return <></>;
});
