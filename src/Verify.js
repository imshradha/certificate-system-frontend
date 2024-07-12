import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper } from '@mui/material';
import axios from 'axios';

function Verify() {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    try {
      if (!certificateId) {
        setMessage('Please enter a Certificate ID');
        return;
      }  
      const response = await axios.get(`http://localhost:3001/api/verify/${certificateId}`);
      if (response.status === 200) {
        const data = response.data;
        setCertificate(data);
        setMessage('');
      } else {
        setCertificate(null);
        setMessage('Certificate not found');
      }
    } catch (error) {
      setCertificate(null); 
      setMessage('Error verifying certificate!');
    }
  };
  
  return (
    <Container component={Paper} maxWidth="sm" sx={{ padding: 4, marginTop: 4 }}>
      <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center', color: 'rgba(0, 0, 0, 0.75)', fontWeight: 'bold' }}>
        Verify Certificate
      </Typography>
      <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ '& > :not(style)': { marginBottom: 2 } }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerify}
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      {certificate && (
        <Box sx={{ marginTop: 2, textAlign: 'center', color: 'rgba(0, 0, 0, 0.80)', }}>
          <Typography variant="h6" fontWeight='bold'>Certificate Details</Typography>
          <Typography variant="body1" gutterBottom>
            Recipient's Name: {certificate.recipientName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Course Name: {certificate.courseName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Issuer's Name: {certificate.issuerName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Date of Issue: {certificate.dateOfIssue}
          </Typography>
        </Box>
      )}
      {message && (
        <Typography variant="body1" color="error" textAlign = 'center' fontWeight= 'bold'>
          {message}
        </Typography>
      )}
    </Container>
  );
}

export default Verify;
