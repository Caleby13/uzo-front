import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

interface ITableGrid {
  columns: GridColDef[];
  rows: any[];
}

export const TableGrid = ({ columns, rows }: ITableGrid) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(e) => e._id}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
