import React, { useState, useEffect } from 'react';
import { MenuItem, styled } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Select from 'react-select';
import { fetchApplicationsList, fetchApplicationData } from './../../services/apiService';
import DataGridTable from '../../components/DataGridTable';
import './applications.css';
import CircularProgress from '@mui/joy/CircularProgress';

const CustomSelect = styled(Select)({
  width: 300,
});

function Applications() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationData, setApplicationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleBack = () => {
    setApplicationData([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApplicationsList();
        setApplications(response);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching applications:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchApplicationDetails = async () => {
      if (selectedApplication) {
        try {
          const response = await fetchApplicationData(selectedApplication.value);
          setApplicationData(response);
          setIsLoading(false);
        } catch (error) {
          console.log('Error fetching application data:', error);
          setApplicationData([]);
          setIsLoading(false);
        }
      } else {
        setApplicationData([]);
        setIsLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [selectedApplication]);

  const handleApplicationSelect = (selectedOption) => {
    setSelectedApplication(selectedOption);
  };

  return (
    <div>
        <div className="filter-wrapper">
            <label className="filter-label">Select Application : </label>
            <CustomSelect
                value={selectedApplication}
                onChange={handleApplicationSelect}
                isClearable
                isSearchable
                isDisabled={isLoading || applications.length === 0}
                isLoading={isLoading}
                options={applications.map((application) => ({
                value: application,
                label: application,
                }))}
                placeholder="Choose the application"
            />
        </div>      

        {applicationData.length ? (
            <DataGridTable tableDetails={applicationData} onBack={handleBack} />
        ) : selectedApplication ? <CircularProgress variant="soft" sx={{margin:'12%'}} size="lg"/>
          :<div style={{margin:'12%', color:'red'}}>Select an option from the dropdown... !!!</div>

    }
        </div>
  );
}

export default Applications;
