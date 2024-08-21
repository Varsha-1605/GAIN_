import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import { useForm } from "react-cool-form";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './fifthpage.css';

function Fifthpage() {
  const user = useSelector((state) => state.User);
  const navigate = useNavigate();

  return (
    <Container  style={{color: 'white', minHeight: '100vh' }}>
      <Box className="container-grid">
        
        <Box className="grid-item">
          <Typography variant="h4" gutterBottom>
            Finance Advisor
          </Typography>
          <Button className="btn-17"
            href="https://financial-advisor-7syx7mb9ngblkvdgfpeqyf.streamlit.app/"
            target="_blank"
            variant="" >
            <span className="text-container">
              <span className="text">Try Now -&gt;</span>
            </span>
          </Button>
        </Box>
        <Box className="grid-item">
          <Typography variant="h4" gutterBottom>
            URLs analyser
          </Typography>
          <Button className="btn-17"
            href="https://research-analyst-xs3odj9sxnnvtxlmeaszq2.streamlit.app/"
            target="_blank"
            variant="" >
            <span className="text-container">
              <span className="text">Try Now -&gt;</span>
            </span>
          </Button>
        </Box>
        <Box className="grid-item center-btn">
          <Typography variant="h4" gutterBottom>
            Docs Analyser
          </Typography>
          <Button className="btn-17"
            href="https://document-uploader-w6p9lpxz9mmycjwdx9586m.streamlit.app/"
            target="_blank"
            variant="" >
            <span className="text-container">
              <span className="text">Try Now -&gt;</span>
            </span>
          </Button>
        </Box>

        

      </Box>

      <Box className="error" >
          <Typography variant="h5" gutterBottom>
            Check out this link to see the working of models, responses and working of other underdevelopment fuctionalities.
            </Typography>
          <Button className="btn-17"
            href="https://drive.google.com/drive/folders/1QUEop9k-hbBSwGOxhsPJ62iNG9LN9aYr?usp=drive_link"
            target="_blank"
            variant="" >
            <span className="text-container">
              <span className="text">Please have a look ^ ^ </span>
            </span>
          </Button>
        </Box>
    </Container>
  );
}

export default Fifthpage;
