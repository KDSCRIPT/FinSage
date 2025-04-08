import React, { useState } from 'react';
import { Search } from 'lucide-react';

const AboutFund = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFund, setSelectedFund] = useState(null);

  const funds = [
    { isin: "INF204K01K15", name: "Nippon India Small Cap Growth Direct Plan" },
    { isin: "INF205K01RY9", name: "Invesco India Money Market Growth Direct Plan" },
    { isin: "INF209KB1Y49", name: "Aditya Birla Sun Life Multi Cap Growth Direct Plan" },
    { isin: "INF247L01CE3", name: "Motilal Oswal Large Cap Growth Direct Plan" },
    { isin: "INF277K01QH5", name: "Tata Equity Saving Growth Direct Plan" },
    { isin: "INF666M01JD9", name: "Groww Multicap Growth Direct Plan" },
    { isin: "INF767K01RK7", name: "LIC MF Multi Cap Growth Direct Plan" },
    { isin: "INF843K01KC8", name: "Edelweiss Equity Saving Growth Direct Plan" },
    { isin: "INF843K01KK1", name: "Edelweiss Flexi Cap Growth Direct Plan" },
    { isin: "INF846K01DS2", name: "Axis Gold Growth Direct Plan" },
    { isin: "INF846K01VJ3", name: "Axis Equity Saving Growth Direct Plan" },
    { isin: "INF879O01027", name: "Parag Parikh Flexi Cap Growth Direct Plan" },
    { isin: "INF917K01FZ1", name: "HSBC Midcap Growth Direct Plan" },
    { isin: "INF959L01DT9", name: "Navi Flexi Cap Growth Direct Plan" },
    { isin: "INF966L01689", name: "Quant Small Cap Growth Direct Plan" },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFundClick = (fund) => {
    fetch('http://localhost:5000/api/mf/about', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fund),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setSelectedFund(data);
      setSearchTerm("");
    })
    .catch(error => {
      console.error('Error sending fund to backend:', error);
    });
  };

  const filteredFunds = funds.filter(fund =>
    fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fund.isin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "rgba(10, 25, 50)", padding: '20px', minHeight: '100vh', paddingLeft: '45px', paddingRight: '45px' }}>
      <h1 style={{ paddingLeft:"9%",color:"white",textAlign: 'left', fontFamily: "Arial, sans-serif", marginBottom: '20px', marginTop: '10px' }}>
        About Fund
      </h1>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px',paddingLeft:"9%" }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            style={{
              width: '100%',
              padding: '10px 10px 10px 35px', // Adjust padding to make space for the icon
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px',
            }}
          />
        </div>
      </div>

      {searchTerm && (
        <div style={{width:"900px", paddingLeft: "2%", color: "black", backgroundColor: "white", borderRadius: '5px', padding: '10px',marginLeft:"9%" }}>
          {filteredFunds.map(fund => (
            <div
              key={fund.isin}
              style={{ marginBottom: '10px', cursor: 'pointer' }}
              onClick={() => handleFundClick(fund)}
            >
              <strong>{fund.name}</strong> ({fund.isin})
            </div>
          ))}
        </div>
      )}
      {selectedFund && (
        <div style={{width:"900px", marginTop: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', color: 'black',marginLeft:"9%" }}>
          <h2>{selectedFund.fund_name}</h2>
          {/* <p><strong>ISIN:</strong> {selectedFund.isin}</p> */}
          <p><strong>Category:</strong> {selectedFund.details.category.value} ({selectedFund.details.category?.note})</p>
          <p><strong>Type:</strong> {selectedFund.details.type.value} ({selectedFund.details.type?.note})</p>

          <p><strong>CRISIL Rating:</strong> {selectedFund.details.crisil_rating?.value} ({selectedFund.details.crisil_rating?.note})</p>
          <p><strong>Expense Ratio:</strong> {selectedFund.details.expense_ratio?.value} ({selectedFund.details.expense_ratio?.note})</p>
          <p><strong>AUM:</strong> {selectedFund.details.aum.value} ({selectedFund.details.aum?.note})</p>

          <p><strong>Fund Rating:</strong> {selectedFund.details.fund_rating?.stars} ({selectedFund.details.fund_rating?.note})</p>
          <p><strong>Info Ratio:</strong> {selectedFund.details.info_ratio?.value} ({selectedFund.details.info_ratio?.note})</p>
          <p><strong>Investment Options:</strong></p>
          <ul>
            <li><strong>Lumpsum:</strong> {selectedFund.details.investment_options?.lumpsum?.available ? 'Available' : 'Not Available'} (Minimum: {selectedFund.details.investment_options?.lumpsum?.minimum}, {selectedFund.details.investment_options?.lumpsum?.note})</li>
            <li><strong>SIP:</strong> {selectedFund.details.investment_options?.sip?.available ? 'Available' : 'Not Available'} (Minimum: {selectedFund.details.investment_options?.sip?.minimum}, {selectedFund.details.investment_options?.sip?.note})</li>
          </ul>
          <p><strong>Returns:</strong></p>
          <ul>
            <li><strong>1 Year:</strong> {selectedFund.details.returns?.['1_year']?.value}% ({selectedFund.details.returns?.['1_year']?.analysis}) ({selectedFund.details.returns?.['1_year']?.note})</li>
            <li><strong>3 Year:</strong> {selectedFund.details.returns?.['3_year']?.value}% ({selectedFund.details.returns?.['1_year']?.analysis}) ({selectedFund.details.returns?.['3_year']?.note})</li>
            <li><strong>5 Year:</strong> {selectedFund.details.returns?.['5_year']?.value}% ({selectedFund.details.returns?.['1_year']?.analysis}) ({selectedFund.details.returns?.['5_year']?.note})</li>
            <li><strong>Since Inception:</strong> {selectedFund.details.returns?.inception?.value}% ({selectedFund.details.returns?.inception?.note})</li>
          </ul>
          <p><strong>Start Date:</strong> {selectedFund.details.start_date?.value} ({selectedFund.details.start_date?.note})</p>
          <p><strong>Type:</strong> {selectedFund.details.type?.value} ({selectedFund.details.type?.note})</p>
          <p><strong>Volatility:</strong> {selectedFund.details.volatility?.value} ({selectedFund.details.volatility?.analysis}) ({selectedFund.details.volatility?.note})</p>
          <p><strong>Quick Summary:</strong></p>
          <ul>
            {selectedFund.quick_summary?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p><strong>Should You Invest:</strong> {selectedFund.should_you_invest?.verdict} ({selectedFund.should_you_invest?.note})</p>
          <p><strong>Reasons:</strong></p>
          <ul>
            {selectedFund.should_you_invest?.reasons?.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
          <p><strong>More Info:</strong> <a href={selectedFund.details.more_info_url} target="_blank" rel="noopener noreferrer">Click here</a></p>
        </div>
      )}
    </div>
  );
};

export default AboutFund;
