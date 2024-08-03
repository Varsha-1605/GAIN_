import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const companies = [
    { code: "AAPL", name: "Apple Inc." },
  { code: "GOOGL", name: "Alphabet Inc. (Class A)" },
  { code: "AMZN", name: "Amazon.com Inc." },
  { code: "AMD", name: "Advanced Micro Devices, Inc." },
  { code: "ADBE", name: "Adobe Inc." },
  { code: "CSCO", name: "Cisco Systems, Inc." },
  { code: "CRM", name: "Salesforce, Inc." },
  { code: "AVGO", name: "Broadcom Inc." },
  { code: "AMAT", name: "Applied Materials, Inc." },
  { code: "AZN", name: "AstraZeneca PLC" },
  { code: "BNTX", name: "BioNTech SE" },
  { code: "ABBV", name: "AbbVie Inc." },
  { code: "CVX", name: "Chevron Corporation" },
  { code: "BP", name: "BP p.l.c." },
  { code: "COP", name: "ConocoPhillips" },
  { code: "BAC", name: "Bank of America Corporation" },
  { code: "C", name: "Citigroup Inc." },
  { code: "AXP", name: "American Express Company" },
  { code: "BK", name: "The Bank of New York Mellon Corporation" },
  { code: "BLK", name: "BlackRock, Inc." },
  { code: "COST", name: "Costco Wholesale Corporation" },
  { code: "ADM", name: "Archer-Daniels-Midland Company" },
  { code: "DIS", name: "DIS - The Walt Disney Company" },
  { code: "CMCSA", name: "Comcast Corporation" },
  { code: "CHTR", name: "Charter Communications, Inc." },
  { code: "GILD", name: "Gilead Sciences, Inc." },
  { code: "ADDYY", name: "adidas AG" },
  { code: "DECK", name: "Deckers Outdoor Corporation" },
  { code: "COLM", name: "Columbia Sportswear Company" },
  { code: "CROX", name: "Crocs, Inc." },
  { code: "FL", name: "Foot Locker, Inc." },
  { code: "FDX", name: "FedEx Corporation" },
  { code: "DAL", name: "Delta Air Lines, Inc." },
  { code: "AAL", name: "American Airlines Group Inc." },
  { code: "ALK", name: "Alaska Air Group, Inc." },
];

const CompanyStocksPrediction = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [open, setOpen] = useState(false);
  const [prediction, setPrediction] = useState(null); // Changed to null initially

  const handleCompanyChange = (event, value) => {
    setSelectedCompany(value);
  };

  const handleButtonClick = () => {
    if (selectedCompany) {
      axios.post("https://gain-model1.onrender.com/predict", {
        company: selectedCompany.name
      }, {
        withCredentials: true
      })
      .then((response) => {
        console.log("Response Data:", response.data);
        setPrediction(response.data); // Ensure this matches your backend response structure
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred: " + (error.response ? error.response.data.error : error.message));
      });
      setSelectedCompany(null);
    } else {
      alert("Please select a company first.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 5 }}>
        Stocks Planner
      </Typography>
      <Autocomplete
        options={companies}
        getOptionLabel={(option) => option.name}
        value={selectedCompany}
        onChange={handleCompanyChange}
        renderInput={(params) => (
          <TextField {...params} label="Select Company" variant="outlined" />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        style={{ marginTop: 16, marginBottom: 20 }}
      >
        Check Stock
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Prediction Result
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {prediction ? (
            prediction.prediction === "Up" ? (
              <>
                The stock for <strong>{prediction.company}</strong> is predicted
                to go <strong style={{ color: "green" }}><u>UP</u></strong>.
              </>
            ) : (
              <>
                The stock for <strong>{prediction.company}</strong> is predicted
                to go <strong style={{ color: "red" }}><u>DOWN</u></strong>.
              </>
            )
          ) : (
            <Typography>No prediction available.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyStocksPrediction;
