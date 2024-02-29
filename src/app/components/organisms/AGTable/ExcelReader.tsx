import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as XLSX from 'xlsx';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { CellValueChangedEvent } from 'ag-grid-community';

type ColumnDef = {
  field: string;
  headerName: string;
  editable?: boolean;
  filter?: boolean;
  // Add any other properties you use in your column definitions
};
export const ExcelReader: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [rowData, setRowData] = useState<Array<{ [key: string]: any }>>([]);
  const [selectedRowNodes, setSelectedRowNodes] = useState<any[]>([]);

  const onSelectionChanged = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    setSelectedRowNodes(selectedNodes);
  };

  const [gridApi, setGridApi] = useState<any | null>(null);
  const [searchText, setSearchText] = useState('');
  const [columnDefs, setColumnDefs] = useState<ColumnDef[]>([]);
  const gridRef = useRef<AgGridReact>(null);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'buffer' });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const json: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (json.length > 0) {
      const headers = json[0].map((header: any, index: any) => ({
        headerName: header,
        field: `field${index}`,
        editable: true,
        filter: true,
      }));
      const rows = json.slice(1).map((row, index) => {
        const rowData: { [key: string]: any } = {}; // Define rowData with an index signature
        row.forEach((cell: any, cellIndex: any) => {
          rowData[`field${cellIndex}`] = cell;
        });
        return rowData;
      });
      // Save to local storage
      localStorage.setItem(
        'excelData',
        JSON.stringify({ columns: headers, rows: rows })
      );
      setColumnDefs([...headers, deleteColumn]);
      setRowData(rows);
    }
  };

  const deleteCellRenderer = (params: any) => {
    return (
      <button onClick={() => handleDelete(params.node.rowIndex)}>Delete</button>
    );
  };
  const onCellValueChanged = (event: CellValueChangedEvent) => {
    if (event.rowIndex != null) {
      // Ensure rowIndex is not null
      const updatedRowData = [...rowData];
      updatedRowData[event.rowIndex] = event.data;
      setRowData(updatedRowData);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem('excelData');
    if (savedData) {
      const { columns, rows } = JSON.parse(savedData);
      setColumnDefs(columns);
      setRowData(rows);
    }
  }, []);

  const handleEdit = (index: number, key: string, newValue: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [key]: newValue };
    setItems(updatedItems);
  };

  // const handleDelete = (rowIndex: number) => {
  //   const updatedRowData = rowData.filter((_, index) => index !== rowIndex);
  //   setRowData(updatedRowData);
  // };

  const deleteColumn = {
    headerName: '',
    field: 'delete',
    cellRendererFramework: (params: any) => (
      <button onClick={() => handleDelete(params.node)}>Delete</button>
    ),
    filter: false,
    sortable: false,
    width: 100,
  };
  const onGridReady = (params: { api: any }) => {
    setGridApi(params.api);
  };

  const onFilterTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    gridApi?.setQuickFilter(event.target.value);
  };

  const saveChanges = () => {
    // Create a new worksheet with headers
    const headers = columnDefs.map((col) => col?.headerName);
    const worksheetData = [
      headers,
      ...rowData.map((row) => Object.values(row)),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'Sheet1');

    // Create a new Excel file
    XLSX.writeFile(newWorkbook, 'updated_file.xlsx');
  };

  const handleDelete = (node: any) => {
    const selectedRowNode = node;
    const selectedRowIndex = selectedRowNode.rowIndex;

    // Update rowData state to remove the deleted row
    const updatedRowData = rowData.filter(
      (_, index) => index !== selectedRowIndex
    );
    setRowData(updatedRowData);
  };
  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    };
  }, []);

  const handleBulkDelete = () => {
    const selectedIds = selectedRowNodes.map((node) => node.id);
    const updatedRowData = rowData.filter(
      (row) => !selectedIds.includes(row.id)
    );
    setRowData(updatedRowData);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
      <div
        className="ag-theme-alpine"
        style={{ height: 800, width: '100%', padding: 18 }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          // defaultColDef={defaultColDef}
          ref={gridRef}
          onGridReady={onGridReady}
          defaultColDef={{
            resizable: true,
            filter: true,
            floatingFilter: true,
          }}
          suppressRowClickSelection={true}
          onSelectionChanged={onSelectionChanged}
          rowSelection="multiple"
          pagination={true} // Enable pagination
          paginationPageSize={10}
          onCellValueChanged={onCellValueChanged}
          paginationPageSizeSelector={[10, 20, 50, 100, 200]}
        />
      </div>
      <button onClick={saveChanges}>Save Changes</button>
      <button onClick={handleBulkDelete}>Delete Selected Rows</button>
    </div>
  );
};
