import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddUserProfile.css';

const AddUserProfile = ({ onProfileAdded }) => {
  const [investments, setInvestments] = useState([]);
  const navigate = useNavigate();

  const addInvestment = () => {
    setInvestments([...investments, { 
      companyName: '', 
      amountInvested: 0, 
      dateOfInvestment: '', 
      profitLoss: 0 
    }]);
  };

  const updateInvestment = (index, field, value) => {
    const updatedInvestments = [...investments];
    updatedInvestments[index][field] = value;
    setInvestments(updatedInvestments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the data to an Excel sheet
    onProfileAdded({ investments });
    navigate('/dashboard'); // Redirect to investments dashboard
  };

  return (
    <div className="add-user-profile" >
      <h2>Add User Profile</h2>
      <form onSubmit={handleSubmit}>
        {investments.map((investment, index) => (
          <div key={index} className="investment-entry">
            <input
              type="text"
              placeholder="Company Name"
              value={investment.companyName}
              onChange={(e) => updateInvestment(index, 'companyName', e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount Invested"
              value={investment.amountInvested}
              onChange={(e) => updateInvestment(index, 'amountInvested', parseFloat(e.target.value))}
            />
            <input
              type="date"
              value={investment.dateOfInvestment}
              onChange={(e) => updateInvestment(index, 'dateOfInvestment', e.target.value)}
            />
            <input
              type="number"
              placeholder="Profit/Loss"
              value={investment.profitLoss}
              onChange={(e) => updateInvestment(index, 'profitLoss', parseFloat(e.target.value))}
            />
          </div>
        ))}
        <button type="button" onClick={addInvestment}>Add Investment</button>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default AddUserProfile;