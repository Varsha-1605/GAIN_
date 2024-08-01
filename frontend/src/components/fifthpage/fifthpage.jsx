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
            href="https://youtu.be/PrvRhnJ30Q0"
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
            href="https://youtu.be/PrvRhnJ30Q0"
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
            href="https://youtu.be/PrvRhnJ30Q0"
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
            href="https://youtu.be/PrvRhnJ30Q0"
            target="_blank"
            variant="" >
            <span className="text-container">
              <span className="text">Try Now -&gt;</span>
            </span>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Fifthpage;
