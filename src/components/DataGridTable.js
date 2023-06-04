import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './dataGridTable.css';

const columns: GridColDef[] = [
    { id: 'ConsumedQuantity', field: 'ConsumedQuantity', headerName: 'Consumed Qty', width: 110,},
    { id: 'Cost', field: 'Cost', headerName: 'Cost', width: 90 },
    { id: 'Date', field: 'Date', headerName: 'Date', width: 90 },
    { id: 'InstanceId', field: 'InstanceId', headerName: 'Instance ID', width: 140 },
    { id: 'MeterCategory', field: 'MeterCategory', headerName: 'Meter Category', width: 125 },
    { id: 'ResourceGroup', field: 'ResourceGroup', headerName: 'Resource Group', width: 120 },
    { id: 'ResourceLocation', field: 'ResourceLocation', headerName: 'Resource Location', width: 135 },
    { id: 'UnitOfMeasure', field: 'UnitOfMeasure', headerName: 'Unit of Measure', width: 120 },
    { id: 'Location', field: 'Location', headerName: 'Location', width: 100 },
    { id: 'ServiceName', field: 'ServiceName', headerName: 'Service Name', width: 100 },
    {
      id: 'Tags',
      field: 'Tags',
      headerName: 'Tags',
      width: 100,
      renderCell: (params: GridValueGetterParams) => {
        const { appName, environment, businessUnit } = params.value || {};
        return (
          <div>
            <p>{appName}</p>
            <p>{environment}</p>
            <p>{businessUnit}</p>
          </div>
        );
      },
    },
];

const DataGridTable = ({tableDetails, onBack}) => {
  const location = useLocation();

  const rowsWithId = tableDetails.map((row, index) => ({
    id: index,
    ...row,
  }));

  const handleBack = () => {
    onBack(); // Call the onBack function passed as prop
  };

  return (
    <div className='table-header' style={{ height: 400, width: '100%' }}>      
      <div className='table-header'>
        <span>
          {location.pathname === '/elancoApplications' ? tableDetails?.[0]?.['ResourceGroup']+' Application': tableDetails?.[0]?.['MeterCategory']+' Resource'}
          &nbsp;Data Set
        </span>
      </div>
      <DataGrid
        rows={rowsWithId}
        columns={columns}        
        pageSize={10}
        pagination
        sortingOrder={['asc', 'desc']}
        disableColumnMenu={false}
        disableColumnSelector
        disableDensitySelector
        disableSelectionOnClick
        checkboxSelection={false}
        getCellClassName={(params) => {
            const isTagCell = params.field === 'tags';
            return isTagCell ? 'tags-cell' : '';
          }}
          renderCell={(params) => {
            if (params.field === 'tags') {
              const { appName, environment, businessUnit } = params.value || {};
              return (
                <div>
                  <p>{appName}</p>
                  <p>{environment}</p>
                  <p>{businessUnit}</p>
                </div>
              );
            }
            return params.value;
          }}
      />
      {location.pathname !== '/elancoApplications' && (
        <Button variant='contained' sx={{backgroundColor:"#063970", marginTop:'5px'}} className="back-button" onClick={handleBack}>
          BACK TO RESOURCE LIST
        </Button>
      )}
    
    {/* <button className="back-button" onClick={handleBack}>BACK TO RESOURCE LIST</button> */}

    </div>
  );
};

export default DataGridTable;
