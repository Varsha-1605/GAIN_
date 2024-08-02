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
    <Container>
      <Box className="container-grid">
        <Box className="grid-item">
          <Typography variant="h4" gutterBottom>
            Recommendation System
          </Typography>
          <Button className="btn-17"
            href="https://financial-recommendation-system-tqiwgy3nwg4ogpc3cryftv.streamlit.app/"
            target="_blank"
            variant="" >
            <span className="text-container">
              <span className="text">Try Now -&gt;</span>
            </span>
          </Button>
        </Box>
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
        <Box className="grid-item">
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
            There might be some problems with the working of the deployed model due to version mismatch and api key error.
            <Typography variant="h5" gutterBottom></Typography>
            We request you to have a look at the demo video submitted and the demo link below for all the ml models where everything works perfectly          </Typography>
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
