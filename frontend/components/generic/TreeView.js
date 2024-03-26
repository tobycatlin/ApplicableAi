import React from "react";

const JsonTreeView = ({ data }) => {
  const renderNode = (node) => {
    if (typeof node === "object" && node !== null) {
      return (
        <ul>
          {Object.entries(node).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {renderNode(value)}
            </li>
          ))}
        </ul>
      );
    }
    return <span>{node}</span>;
  };

  return <div>{renderNode(data)}</div>;
};

export default JsonTreeView;
