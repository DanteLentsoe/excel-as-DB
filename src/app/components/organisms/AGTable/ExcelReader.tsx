'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import DatePicker from 'react-datepicker';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'react-datepicker/dist/react-datepicker.css';
import {
  CellValueChangedEvent,
  RowNode,
  ICellRendererParams,
  IRowNode,
} from 'ag-grid-community';
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

type RowDataType = Array<{ [key: string]: any }>;

export const ExcelReader: React.FC = () => {
  const [rowData, setRowData] = useState<RowDataType>([]);
  const rowDataRef = useRef<RowDataType | null>(null);

  rowDataRef.current = rowData;

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
        'excel_sheetwise_excelData',
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

    try {
      const updatedRowData = [...rowData, newRowData];

      setRowData(updatedRowData);
      setNewRowData({}); // Reset form data

      // Update local storage
      const updatedData = { columns: columnDefs, rows: updatedRowData };
      localStorage.setItem(
        'excel_sheetwise_excelData',
        JSON.stringify(updatedData)
      );
    } catch (error) {
      console.error('Error Adding Data ', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...newRowData, [field]: value };

    console.log('Updated Row Data:', updatedData);
    setNewRowData(updatedData);
  };

  const onCellValueChanged = (event: CellValueChangedEvent) => {
    if (event.rowIndex != null) {
      try {
        // Ensure rowIndex is not null
        const updatedRowData = [...rowData];
        updatedRowData[event.rowIndex] = event.data;
        setRowData(updatedRowData);
      } catch (error) {
        console.error('error updating cell: ', error);
      }
    }
  };

  useEffect(() => {
    // gets locally stored excel data
    const savedData = localStorage.getItem('excel_sheetwise_excelData');
    if (savedData) {
      try {
        const { columns, rows, sheetName } = JSON.parse(savedData);
        setColumnDefs([...columns, deleteColumn]);
        setRowData(rows);
        setWorksheetName(sheetName);
      } catch (error) {
        console.error('error setting excel data ', error);
      }
    }
  }, []);

  const deleteColumn = {
    headerName: '',
    field: 'delete',
    cellRenderer: (params: ICellRendererParams) => {
      return (
        <Button
          onClick={() => handleDelete(params.data)}
          variant={'borderMagic'}
        >
          Delete
        </Button>
      );
    },
    filter: false,
    sortable: false,
    width: 100,
  };

  const onGridReady = (params: { api: any }) => {
    setGridApi(params.api);
  };

  const saveChanges = () => {
    try {
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
    } catch (error) {
      console.error('save excel', error);
    }
  };

  const confirmDelete = (node: RowNode) => {
    const confirm = window.confirm('Are you sure you want to delete this row?');
    if (confirm) {
      handleDelete(node);
    }
  };

  const handleDelete = (nodeData: IRowNode) => {
    const delData = JSON.stringify(nodeData);
    try {
      const updatedRowData = rowDataRef.current?.filter((row, idx) => {
        return JSON.stringify(row) !== delData;
      });

      // Update rowData state to remove the deleted row

      setRowData(updatedRowData as Array<RowDataType>);

      // Update local storage to reflect the change
      localStorage.setItem(
        'excel_sheetwise_excelData',
        JSON.stringify({ columns: columnDefs, rows: updatedRowData })
      );
    } catch (error) {
      console.error('Error deleting row ', error);
    }
  };

  const handleBulkDelete = () => {
    const selectedIds = selectedRowNodes.map((node) => node.id);
    const updatedRowData = rowData.filter(
      (row) => !selectedIds.includes(row.id)
    );
    setRowData(updatedRowData);
  };

  const filteredCols = columnDefs.filter((colDef) => colDef.headerName !== '');

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
        <form onSubmit={handleAddRow} className="">
          <div className="mt-4 grid grid-cols-2 gap-4 justify-center items-center mb-4">
            {filteredCols.map((colDef) => {
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
          </div>
          {/* Grouping buttons together */}
          <div className="mt-2 inline-flex gap-4 w-full">
            <Button
              className="text-white font-semibold whitespace-nowrap flex-1"
              variant={'shimmer'}
              type="submit"
            >
              Add Row
            </Button>
            <Button
              className="text-white font-semibold whitespace-nowrap flex-1"
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
