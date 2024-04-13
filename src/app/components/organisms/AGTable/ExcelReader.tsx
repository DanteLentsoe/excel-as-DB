'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import DatePicker from 'react-datepicker';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'react-datepicker/dist/react-datepicker.css';
import { CellValueChangedEvent } from 'ag-grid-community';
import { NavigationBar } from '../NavigationBar';
import { Button } from '../../atoms/Button';
import { Modal } from '../../molecules/Modal';
import { useModalStore } from '@/store';

export type ColumnDef = {
  field: string;
  headerName: string;
  editable?: boolean;
  filter?: boolean;
  type?: string;
  cellRenderer?: React.JSX.Element;
};

export const ExcelReader: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [rowData, setRowData] = useState<Array<{ [key: string]: any }>>([]);
  const [selectedRowNodes, setSelectedRowNodes] = useState<any[]>([]);
  const [newRowData, setNewRowData] = useState<{ [key: string]: any }>({});
  const onSelectionChanged = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    setSelectedRowNodes(selectedNodes);
  };
  const [worksheetName, setWorksheetName] = useState<string | undefined>(
    undefined
  );

  const [gridApi, setGridApi] = useState<any | null>(null);
  const [searchText, setSearchText] = useState('');
  const [columnDefs, setColumnDefs] = useState<ColumnDef[]>([]);
  const gridRef = useRef<AgGridReact>(null);
  const { openModal, closeModal } = useModalStore((state) => state);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'buffer' });
    const worksheetName = workbook.SheetNames[0];
    setWorksheetName(worksheetName); // Store the worksheet name in state
    const worksheet = workbook.Sheets[worksheetName];
    const json: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (json.length > 0) {
      const headers = json[0].map((header: any, index: any) => ({
        headerName: header,
        field: `field${index}`,
        editable: true,
        filter: true,
        type: 'text',
      }));
      const rows = json.slice(1).map((row, index) => {
        const rowData: { [key: string]: any } = {}; // Define rowData with an index signature
        row.forEach((cell: any, cellIndex: any) => {
          // Convert to number if possible, otherwise use the string value
          rowData[`field${cellIndex}`] = isNaN(cell) ? cell : Number(cell);
        });
        return rowData;
      });
      // Save to local storage
      localStorage.setItem(
        'excelData',
        JSON.stringify({
          columns: [...headers, deleteColumn],
          rows: rows,
          sheetName: worksheetName,
        })
      );
      setColumnDefs([...headers, deleteColumn]);
      setRowData(rows);
    }
  };

  const handleAddRow = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedRowData = [...rowData, newRowData];
    setRowData(updatedRowData);
    setNewRowData({}); // Reset form data

    // Update local storage
    const updatedData = { columns: columnDefs, rows: updatedRowData };
    localStorage.setItem('excelData', JSON.stringify(updatedData));
  };

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...newRowData, [field]: value };

    console.log('Updated Row Data:', updatedData);
    setNewRowData(updatedData);
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
      const { columns, rows, sheetName } = JSON.parse(savedData);
      setColumnDefs([...columns, deleteColumn]);
      setRowData(rows);
      setWorksheetName(sheetName);
    }
  }, []);

  const handleEdit = (index: number, key: string, newValue: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [key]: newValue };
    setItems(updatedItems);
  };

  const deleteColumn = {
    headerName: '',
    field: 'delete',
    cellRenderer: (params: { node: unknown }) => (
      <Button onClick={() => handleDelete(params.node)} variant={'borderMagic'}>
        Delete
      </Button>
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
    console.log('Deleting row at index:', selectedRowIndex);

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
      <NavigationBar handleFile={handleFile} />

      <div className="flex justify-between my-4 mx-8 mt-8">
        <Button
          className="w-32 h-8 text-center"
          onClick={() => {
            openModal('base-form');
          }}
          variant={'borderMagic'}
        >
          Add
        </Button>
        <Button
          onClick={saveChanges}
          className="w-32 h-8 text-center"
          variant={'borderMagic'}
        >
          Save Changes
        </Button>
      </div>

      <div
        className="ag-theme-alpine-dark"
        id="myGrid"
        style={{ height: 800, width: '100%', padding: 32 }}
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

      <Modal
        id={'base-form'}
        title={worksheetName || 'Base Form'}
        className="w-96 h-96"
      >
        <form
          onSubmit={handleAddRow}
          className="mt-4 grid grid-cols-2 gap-4 justify-center items-center"
        >
          {columnDefs.map((colDef) => {
            return colDef.type === 'date' ? (
              <DatePicker
                key={colDef.field}
                selected={newRowData[colDef.field]}
                onChange={(date) =>
                  handleInputChange(
                    colDef.field,
                    date ? date.toISOString().split('T')[0] : ''
                  )
                }
                className="px-3 py-2 text-zinc-950 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <input
                key={colDef.field}
                type={colDef.type === 'number' ? 'number' : 'text'}
                placeholder={colDef.headerName}
                value={newRowData[colDef.field] || ''}
                onChange={(e) =>
                  handleInputChange(colDef.field, e.target.value)
                }
                className="px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            );
          })}
          {/* Grouping buttons together */}
          <div className="mt-2 flex flex-row gap-52">
            <Button
              className="text-white font-semibold w-64"
              variant={'shimmer'}
            >
              Add Row
            </Button>
            <Button
              className="text-white font-semibold w-full"
              variant={'shimmer'}
              onClick={() => closeModal('base-form')}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
