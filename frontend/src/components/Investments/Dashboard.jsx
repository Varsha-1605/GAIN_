import React from 'react';
import { Link } from 'react-router-dom';
import PieChart from './PieChart';
import DonutChart from './DonutChart';
import './Dashboard.css'; // We'll create this CSS file for styling
import { useDispatch } from 'react-redux';
import { clearUserData } from '../../redux/slices/User_Slice';


const Dashboard = ({ userProfile }) => {
  if (!userProfile) {
    return (
      <div className="dashboard">
        <h1>Investment Dashboard</h1>
        <p>You haven't added a profile yet.</p>
        <Link to="/investments/add-profile">
          <button>Add User Profile</button>
        </Link>
      </div>
    );
  }

  const calculateTotals = () => {
    return userProfile.investments.reduce((acc, inv) => ({
      totalInvested: acc.totalInvested + inv.amountInvested,
      totalProfitLoss: acc.totalProfitLoss + inv.profitLoss
    }), { totalInvested: 0, totalProfitLoss: 0 });
  };

  const { totalInvested, totalProfitLoss } = calculateTotals();

  return (
    <div className="dashboard">
      <h1>Investment Dashboard</h1>
      {!userProfile ? (
        <Link to="/investments/add-profile">
          <button>Add User Profile</button>
        </Link>
      ) : (
        <>
          <div className="charts-container">
            <div className="chart-wrapper">
              <PieChart investments={userProfile.investments} />
            </div>
            <div className="chart-divider"></div>
            <div className="chart-wrapper">
              <DonutChart 
                totalInvested={totalInvested}
                totalProfitLoss={totalProfitLoss}
              />
            </div>
          </div>
          <div className="investment-breakdown">
            <h2>Investment Breakdown</h2>
            <ul>
              {userProfile.investments.map((investment, index) => (
                <li key={index}>
                  <span className="company-name">{investment.companyName}</span>
                  <span className="investment-amount">Rs. {investment.amountInvested.toLocaleString()}</span>
                  <span className="profit-loss">
                    Profit/Loss: Rs. {investment.profitLoss.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

        <Link to="/investments/add-profile">
          <button>Add User Profile</button>
        </Link>
    </div>
  );
};

export default Dashboard;