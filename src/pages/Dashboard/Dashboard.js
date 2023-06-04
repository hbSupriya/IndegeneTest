import React, { useEffect, useState, useRef } from 'react';
import { fetchResourceData, fetchResourceList } from '../../services/apiService';
import { Grid, Card, CardContent, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import DataGridTable from '../../components/DataGridTable';
import './dashboard.css';

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  background: 'linear-gradient(to right, #033c7e, #0aa7b6)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  animation: '$glitch-animation 2s infinite',
  '@keyframes glitch-animation': {
    '0%': {
      transform: 'skewX(0deg) scale(1)',
    },
    '50%': {
      transform: 'skewX(10deg) scale(0.9)',
    },
    '100%': {
      transform: 'skewX(-10deg) scale(1)',
    },
  },
}));

function Dashboard() {
  const [data, setData] = useState([]);
  const [numCols, setNumCols] = useState(6);
  const containerRef = useRef(null);
  const [resourceData,setResourceData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchResourceList();
      if (fetchedData) {
        setData(fetchedData);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newNumCols = Math.floor(containerWidth / 200); // Adjust the card width as per your design
        setNumCols(newNumCols);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it initially to set the number of columns

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCardClick = async (itemId) => {
    // Call API to fetch card details based on itemId
    // Once data is fetched, navigate to another view to display the Data Grid
    
      const fetchedData = await fetchResourceData(itemId);
      if (fetchedData) {
        setResourceData(fetchedData);
      }
  };
  
  const handleBack = () => {
    setResourceData([]);
  };

  return (
    <div ref={containerRef} className="dashboard-gridview">      
      {resourceData?.length ? (
        <DataGridTable tableDetails={resourceData} onBack={handleBack} />
      ) : (<>
      {
        data.length ? 
        <>
            <div className="card-grid-header">Click on Resource Cards for their details</div>
            <Grid container spacing={2}>
              {data.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={Math.floor(12 / numCols)}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 100,
                      padding: '2px',
                      fontSize: '0.90rem',
                      lineHeight:'1.25',
                      backgroundColor: '#E8F0FF',
                      cursor:'pointer',                
                      transition: 'background-color 0.3s',
                      '&:hover': {
                        backgroundColor: '#C5D8FF',
                      },
                    }}
                    onClick={() => handleCardClick(item)} // Pass the item id as an argument to the click handler
                  >
                    <CardContent>
                      <CustomTypography align="center">
                        {item}
                      </CustomTypography>                
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
        </>
        :<CircularProgress variant="soft" sx={{margin:'12%'}} size="lg"/>
      }</>
      )}
    </div>
  );
}

export default Dashboard;
