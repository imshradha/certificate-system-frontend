import React, { useState } from 'react';
import './App.css';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import axios from 'axios';

function App() {
  const [recipientName, setRecipientName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [issuerName, setIssuerName] = useState('');
  const [dateOfIssue, setDateOfIssue] = useState('');
  const [certificateId, setCertificateId] = useState(null);

  const handleIssue = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/issue', {
        recipientName,
        courseName,
        issuerName,
        dateOfIssue
      });
      setCertificateId(response.data.certificateId);
       // Clear form values
       setRecipientName('');
       setCourseName('');
       setIssuerName('');
       setDateOfIssue('');
    } catch (error) {
      console.error('Error issuing certificate:', error);
    }
  };

  return (
    <Container component={Paper} maxWidth="sm" sx={{ padding: 4, marginTop: 4 }}>
      <Typography variant="h5" component="h1" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold', color: '#3f51b8' }}>
        Certificate Issuing and Verifying System
      </Typography>
      <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center', color: 'rgba(0, 0, 0, 0.75)', fontWeight: 'bold' }}>
        Issue Certificate
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Recipient's Name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            margin="normal"
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            margin="normal"
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Issuer's Name"
            value={issuerName}
            onChange={(e) => setIssuerName(e.target.value)}
            margin="normal"
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            type="date"
            label="Date of Issue"
            InputLabelProps={{ shrink: true }}
            value={dateOfIssue}
            onChange={(e) => setDateOfIssue(e.target.value)}
            margin="normal"
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleIssue}
          >
            Submit
          </Button>
        </Box>
      </form>
      {certificateId && (
        <Typography variant="body1" component="p" sx={{ marginTop: 2, fontWeight: 'bold', textAlign: 'center', color: 'rgba(0, 0, 0, 0.75)', }}>
          Certificate ID: {certificateId}
        </Typography>
      )}
    </Container>
  );
}

export default App;
