import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TradingView from '@/widgets/charts/TradingView';
import FundamentalData from '@/widgets/charts/FundamentalData';
import { Input, Button } from "@material-tailwind/react";
import Profilestatus from '@/widgets/charts/profile';
import Technical from '@/widgets/charts/technical';
import ChatUI from '@/widgets/charts/chat';
const Chart = () => {
    const [symbolInput1, setSymbolInput1] = useState('TCS'); // Manage input field state
    const [symbol, setSymbol] = useState('TCS'); // Manage input field state
    const [showCharts, setShowCharts] = useState(false); // Manage whether to show charts

    const location = useLocation();

    const handleSymbolChange = (event) => {
        // Update the symbol input state when the input changes
        setSymbolInput1(event.target.value.toUpperCase());
    };

    const handleSubmit = () => {
        // Convert input to uppercase
        console.log(symbolInput1);
        // Update the symbolInput state with the current value
        setSymbol(symbolInput1.toUpperCase());
        setShowCharts(true); // Show charts after submit button is clicked
    };
    const handleRefresh = () => {
        window.location.reload(); // Reloads the webpage
      };

    const clearSymbol = () => {
        setSymbol('');
        setShowCharts(false);
    };

    return (
        <>
            <Input
                size="lg"
                placeholder="Enter stock symbol (e.g., AAPL, MSFT)"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
                onChange={handleSymbolChange} // Handle input changes
                value={symbolInput1} // Bind input field value to symbolInput1 state
            />
            <Button onClick={handleSubmit}>Submit</Button>
            <button onClick={handleRefresh} style={{ backgroundColor: 'red', marginLeft: '10px', width:"100px " , height: "40px", borderRadius:"20px" }}>Clear</button>

            {showCharts && (
                <>
                    <TradingView symbol={symbol} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FundamentalData symbol={symbol} />
      <Technical symbol={symbol} style={{ marginLeft: '60px' }} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    <Profilestatus symbol={symbol} style={{ marginRight: '10px', marginLeft: '5px' }} />
  <ChatUI/>
    </div>

                    <Button onClick={clearSymbol}>Clear</Button>
                </>
            )}
        </>
    );
};

export default Chart;
