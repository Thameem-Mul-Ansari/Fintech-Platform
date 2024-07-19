import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns"; 
import "react-datepicker/dist/react-datepicker.css";
import "./notifications.css";
import axios from 'axios'; 

export function Notifications() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDates, setShowDates] = useState(false); 

  const currentDate = new Date();

  const formatDate = (date) => (date ? format(date, "yyyy,M,d") : "");


  const executeBacktesting = async () => {
    // Execute backtesting.py here using Axios or another method
    try {
      const response = await axios.post("/api/backtesting");
      console.log(response.data); // Handle the response accordingly
    } catch (error) {
      console.error("Error executing backtesting.py:", error);
    }
  };

  const executeTradingBot = async () => {
    // Execute tradingbot.py here using Axios or another method
    try {
      const response = await axios.post("/api/tradingbot");
      console.log(response.data); // Handle the response accordingly
    } catch (error) {
      console.error("Error executing tradingbot.py:", error);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold mb-6">📈 ML Trader 🚀</h1>
      <div className="flex" style={{ marginTop: "20px" }}></div>
      <div className="flex">
        <div className="mr-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            inline
            className="custom-datepicker"
            maxDate={currentDate}
          />
          <h2 className="text-3xl font-bold mb-4">📆 Start Date 📆</h2>
        </div>
        <div style={{ marginLeft: '250px' }}>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            inline
            className="custom-datepicker"
            maxDate={currentDate}
          />
          <h2 className="text-3xl font-bold mb-4">📆 End Date 📆</h2>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={executeBacktesting} > 
          💵 BackTesting 📈
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 " onClick={executeTradingBot} >
          💵 Perform Trade 📈
        </button>
      </div>
      {showDates && (
        <div className="mt-4">
          <p>Selected Start Date: {formatDate(startDate)}</p>
          <p>Selected End Date: {formatDate(endDate)}</p>
        </div>
      )}
    </div>
  );
}

export default Notifications;
