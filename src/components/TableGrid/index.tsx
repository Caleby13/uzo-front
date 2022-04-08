import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridEvents,
  GridValueGetterParams,
} from "@mui/x-data-grid";

interface ITableGrid {
  columns: GridColDef[];
  rows: any[];
  onRowClick?: Function;
}

export const TableGrid = ({ columns, rows, onRowClick }: ITableGrid) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(e) => e._id}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={(e) => {
          onRowClick ? onRowClick(e.id) : null;
        }}
      />
    </div>
  );
};
