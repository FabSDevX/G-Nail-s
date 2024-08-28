import { Link } from "@mui/material";
import propTypes from "prop-types";
import { useState } from "react";

//MATERIAL UI COMPONENT FOR EXPAND DATA IN DATAGRID
function ExpandableCell({ value }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {expanded ? value : value.slice(0, 70)}&nbsp;
      {value.length > 70 && (
        <Link
          type="button"
          component="button"
          sx={{ fontSize: "inherit" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "ver menos" : "ver más"}
        </Link>
      )}
    </div>
  );
}
ExpandableCell.propTypes = {
  value: propTypes.string.isRequired,
};

export default ExpandableCell;
