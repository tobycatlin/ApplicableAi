import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function TableView(props) {
  const { data } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// const TableView = ({ data }) => {
//   const renderNode = (node) => {
//     if (typeof node === "object" && node !== null) {
//       return (
//         <ul>
//           {Object.entries(node).map(([key, value]) => (
//             <li key={key}>
//               <strong>{key}:</strong> {renderNode(value)}
//             </li>
//           ))}
//         </ul>
//       );
//     }
//     return <span>{node}</span>;
//   };

//   return <div>{renderNode(data)}</div>;
// };
