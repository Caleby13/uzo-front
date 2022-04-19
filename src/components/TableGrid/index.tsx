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
  onRowDoubleClick?: GridEventListener<GridEvents.rowDoubleClick> | undefined;
}

export const TableGrid = ({
  columns,
  rows,
  onRowClick,
  onRowDoubleClick,
}: ITableGrid) => {
  return (
    <div style={{ height: "75vh", width: "100%" }}>
      <DataGrid
        getRowId={(e) => e._id}
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100]}
        onRowClick={(e) => {
          onRowClick ? onRowClick(e.id) : null;
        }}
        rowHeight={30}
        onRowDoubleClick={onRowDoubleClick}
      />
    </div>
  );
};
