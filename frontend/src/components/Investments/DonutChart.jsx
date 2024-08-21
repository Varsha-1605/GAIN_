import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ totalInvested, totalProfitLoss }) => {
  const profitLossPercentage = (totalProfitLoss / totalInvested) * 100;
  const isProfit = totalProfitLoss >= 0;

  const data = {
    datasets: [
      {
        data: [totalInvested],
        backgroundColor: ['#36A2EB'],
        label: 'Total Invested'
      },
      {
        data: [Math.abs(profitLossPercentage), 100 - Math.abs(profitLossPercentage)],
        backgroundColor: [isProfit ? 'rgba(75, 192, 192, 0.5)' : 'rgba(255, 99, 132, 0.5)', 'rgba(0, 0, 0, 0)'],
        label: 'Profit/Loss'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.datasetIndex === 0) {
              return `Total Invested: Rs. ${totalInvested.toLocaleString()}`;
            } else {
              return `${isProfit ? 'Profit' : 'Loss'}: Rs. ${Math.abs(totalProfitLoss).toLocaleString()}`;
            }
          }
        }
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};

export default DonutChart;