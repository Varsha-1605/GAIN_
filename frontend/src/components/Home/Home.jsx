import React, { useState } from "react";
import { useForm } from "react-cool-form";
import { Card, CardActionArea, CardContent, CardMedia,Grid, MenuItem } from '@mui/material';
import StockChart from '../StockChart/StockChart.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Image1 from './image/chatbot2.jpg';
import Image2 from './image/doc_uploader.jpg';
import Image3 from './image/financial_advisor.jpg';
import Image4 from './image/community_forum.jpg';
import Image5 from './image/chatbot2.jpg';
import Image6 from './image/doc_uploader.jpg';
import Image7 from './image/financial_advisor.jpg';
import Image8 from '.'./image/community_forum.jpg';
import { Helmet } from 'react-helmet';
import VideoSource from './image/2792370-hd_1920_1080_30fps.mp4';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Button,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  LovingDoodle,
  MeditatingDoodle,
  JumpingDoodle,
  CoffeeDoodle,
  DoggieDoodle,
  ReadingDoodle,
} from "react-open-doodles";
import CompanyStocksPrediction from "../CompanyStocksPrediction/CompanyStocksPrediction";
import "./Home.css";
import axios from "axios";

const stockSymbols = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'GOOGL', name: 'Google Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'TSLA', name: 'Tesla, Inc.' },
  { symbol: 'RELI', name: 'Reliance Industries Limited' },
  { symbol: 'TCS', name: 'Tata Consultancy Services' },
  { symbol: 'INFY', name: 'Infosys Limited' },
  { symbol: 'HDB', name: 'HDFC Bank Limited' },
  { symbol: 'WIT', name: 'Wipro Limited' },
];

const companies = [
  { code: "AAPL", name: "Apple Inc." },
  { code: "MSFT", name: "Microsoft Corporation" },
  { code: "GOOGL", name: "Alphabet Inc. (Class A)" },
  { code: "AMZN", name: "Amazon.com Inc." },
  { code: "META", name: "Meta Platforms, Inc. (formerly Facebook, Inc.)" },
  { code: "NVDA", name: "NVIDIA Corporation" },
  { code: "TSLA", name: "Tesla, Inc." },
  { code: "AMD", name: "Advanced Micro Devices, Inc." },
  { code: "NFLX", name: "Netflix, Inc." },
  { code: "ADBE", name: "Adobe Inc." },
  { code: "INTC", name: "Intel Corporation" },
  { code: "CSCO", name: "Cisco Systems, Inc." },
  { code: "IBM", name: "International Business Machines Corporation" },
  { code: "ORCL", name: "Oracle Corporation" },
  { code: "CRM", name: "Salesforce, Inc." },
  { code: "TXN", name: "Texas Instruments Incorporated" },
  { code: "QCOM", name: "QUALCOMM Incorporated" },
  { code: "AVGO", name: "Broadcom Inc." },
  { code: "MU", name: "Micron Technology, Inc." },
  { code: "AMAT", name: "Applied Materials, Inc." },
  { code: "MRNA", name: "Moderna, Inc." },
  { code: "PFE", name: "Pfizer Inc." },
  { code: "JNJ", name: "Johnson & Johnson" },
  { code: "AZN", name: "AstraZeneca PLC" },
  { code: "BNTX", name: "BioNTech SE" },
  { code: "NVAX", name: "Novavax, Inc." },
  { code: "LLY", name: "Eli Lilly and Company" },
  { code: "ABBV", name: "AbbVie Inc." },
  { code: "REGN", name: "Regeneron Pharmaceuticals, Inc." },
  { code: "XOM", name: "Exxon Mobil Corporation" },
  { code: "CVX", name: "Chevron Corporation" },
  { code: "BP", name: "BP p.l.c." },
  { code: "COP", name: "ConocoPhillips" },
  { code: "VLO", name: "Valero Energy Corporation" },
  { code: "PSX", name: "Phillips 66" },
  { code: "MPC", name: "Marathon Petroleum Corporation" },
  { code: "OXY", name: "Occidental Petroleum Corporation" },
  { code: "JPM", name: "JPMorgan Chase & Co." },
  { code: "BAC", name: "Bank of America Corporation" },
  { code: "WFC", name: "Wells Fargo & Company" },
  { code: "C", name: "Citigroup Inc." },
  { code: "GS", name: "The Goldman Sachs Group, Inc." },
  { code: "MS", name: "Morgan Stanley" },
  { code: "AXP", name: "American Express Company" },
  { code: "BK", name: "The Bank of New York Mellon Corporation" },
  { code: "BLK", name: "BlackRock, Inc." },
  { code: "TROW", name: "T. Rowe Price Group, Inc." },
  { code: "KO", name: "The Coca-Cola Company" },
  { code: "PEP", name: "PepsiCo, Inc." },
  { code: "COST", name: "Costco Wholesale Corporation" },
  { code: "WMT", name: "Walmart Inc." },
  { code: "TGT", name: "Target Corporation" },
  { code: "HD", name: "The Home Depot, Inc." },
  { code: "LOW", name: "Lowe's Companies, Inc." },
  { code: "KR", name: "The Kroger Co." },
  { code: "SYY", name: "Sysco Corporation" },
  { code: "ADM", name: "Archer-Daniels-Midland Company" },
  { code: "DIS", name: "DIS - The Walt Disney Company" },
  { code: "CMCSA", name: "Comcast Corporation" },
  { code: "TMUS", name: "T-Mobile US, Inc." },
  { code: "VZ", name: "Verizon Communications Inc." },
  { code: "T", name: "AT&T Inc." },
  { code: "CHTR", name: "Charter Communications, Inc." },
  { code: "NWS", name: "News Corporation" },
  { code: "GILD", name: "Gilead Sciences, Inc." },
  { code: "NKE", name: "NIKE, Inc." },
  { code: "ADDYY", name: "adidas AG" },
  { code: "PUMA", name: "Puma SE" },
  { code: "UAA", name: "Under Armour, Inc." },
  { code: "SKX", name: "Skechers U.S.A., Inc." },
  { code: "DECK", name: "Deckers Outdoor Corporation" },
  { code: "LULU", name: "Lululemon Athletica Inc." },
  { code: "COLM", name: "Columbia Sportswear Company" },
  { code: "CROX", name: "Crocs, Inc." },
  { code: "FL", name: "Foot Locker, Inc." },
  { code: "FDX", name: "FedEx Corporation" },
  { code: "UPS", name: "United Parcel Service, Inc." },
  { code: "DAL", name: "Delta Air Lines, Inc." },
  { code: "LUV", name: "Southwest Airlines Co." },
  { code: "UAL", name: "United Airlines Holdings, Inc." },
  { code: "AAL", name: "American Airlines Group Inc." },
  { code: "HA", name: "Hawaiian Holdings, Inc." },
  { code: "JBLU", name: "JetBlue Airways Corporation" },
  { code: "ALK", name: "Alaska Air Group, Inc." },
  { code: "SAVE", name: "Spirit Airlines, Inc." },
];

function Home() {
  const [news, setNews] = useState([]);
  const [selectedStock, setSelectedStock] = useState(stockSymbols[0].symbol);
  const [open, setOpen] = useState(false);
  const [investmentAdvice, setInvestmentAdvice] = useState("");
  const { form, use, reset } = useForm({
    defaultValues: {
      age: "",
      risk: "",
      amount: "",
      term: "",
      diversity: "",
    },
    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5002/predict/stock",
          {
            Age_Group: values.age,
            Risk_Level: values.risk,
            Amount_to_Invest: values.amount,
            Investment_Term: values.term,
            Diversity_Option: "Just one stock",
          }
        );
        console.log(response.data);
        setInvestmentAdvice(response.data["Investment Advice"]);
        setOpen(true);
      } catch (error) {
        console.error(error);
      }
      reset();
    },
  });

  const errors = use("errors");

  const ageOptions = ["16-18", "18-24", "24-34", "34-45", "45+"];
  const riskOptions = [
    "High risk- high return",
    "medium risk- medium return",
    "low risk- low return",
  ];
  const amountOptions = ["0-50k", "100k-500k", "500k-1m"];
  const termOptions = [
    "Intraday",
    "2-4 weeks",
    "1-3 months",
    "1-3 years",
    "3-5 years",
    "5-10 years",
  ];
  const diversityOptions = [
    "Just one stock",
    "multiple stocks",
    "multiple sectors",
    "hybrid",
  ];


  return (
    <Container style={{ margin: 0, padding: 0,color: 'white', minHeight: '100vh' }}>
      


      <div className="slider-frame">
        <div className="slide-images imagetrack">
          <div className="img-container">
            <img className="image" src={Image1} alt="Slide 1" />
          </div>
          <div className="img-container">
            <img className="image" src={Image2} alt="Slide 2" />
          </div>
          <div className="img-container">
            <img className="image" src={Image3} alt="Slide 3" />
          </div>
          <div className="img-container">
            <img className="image" src={Image4} alt="Slide 4" />
          </div>
          <div className="img-container">
            <img className="image" src={Image5} alt="Slide 5" />
          </div>
          <div className="img-container">
            <img className="image" src={Image6} alt="Slide 6" />
          </div>
          <div className="img-container">
            <img className="image" src={Image7} alt="Slide 7" />
          </div>
        </div>
      </div>

      <div className="box">
        <p> This is the home page of our application and should explain how our model should be working and the workflow of our application and we have multiple functionalities around it.</p>
        <p> The 3 main models of our website is:</p>
        <p>  Financial Advisor : which can give personalized suggestions to even a biggener.</p>
        <p>URLs Analyzer : which works on a RAG + LLM model which increases the efficiency of the model by atleast 80% which can retrieve multiple chunks of news data and and answer any questions based on them.</p>
        <p>Docs Analyzer : which also works on a RAG + LLM model which increases the efficiency of the model by atleast 80% which can summarize financial reports for you and also tell if it is good or bad for the company</p>


      </div>

      <div
        style={{
          position: 'relative',
          marginBottom: 0,
          paddingBottom: 0,
          minHeight: '100vh',
          minWidth: '98vw',
          maxWidth: '100vw',
          overflow: 'hidden',
          display: 'flex',             // Added Flexbox
          alignItems: 'center',        // Vertically centers the content
          justifyContent: 'center',    // Horizontally centers the content
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',       // Positioned absolutely to cover the parent div
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            
          }}
        >
          <source src={VideoSource} type="video/mp4" />
        </video>
        <div class="button-container custom-shape">
    <Button 
        component={Link}
        className="centered-button brutalist-button openai button-1 border-span"
        variant="containPed"
        color="primary"
        size="large"
        to="/login"
        target="_blank"
        rel="noopener"
        style={{
            fontSize: '0.8rem',
        }}
    >
      
        <div class="openai-logo">
            <svg
                class="openai-icon"
                viewBox="-13 2 50 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5907 8.3829 14.6108 7.2144a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3927-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
                    fill="#10A37F"
                ></path>
            </svg>
        </div>  
        <div class="button-text">
            <span>Powered By</span>
            <span>OpenAI</span>
        </div>
    </Button>
</div>

      </div>



        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 5,mb:3 }}>
            Stock Charts
          </Typography>

          <FormControl sx={{ mb: 2, minWidth: 200, color: 'white' }}>
              <InputLabel sx={{ color: 'white'}}>Company</InputLabel>
              <Select
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                label="Company"
                sx={{
                  color: 'white',
                  border: '1px solid white', 
                  marginTop: '10px'
                }}
              >
                 {stockSymbols.map((stock) => (
              <MenuItem key={stock.symbol} value={stock.symbol} >
                {stock.name}
              </MenuItem>
                ))}
              </Select>
            </FormControl>


        <StockChart symbol={selectedStock} />

        
    </Container>
  );
}

export default Home;
