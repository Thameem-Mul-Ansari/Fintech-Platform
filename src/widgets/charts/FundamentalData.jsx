import React, { useEffect, useRef, memo } from 'react';

function FundamentalViewWidget({ symbol }) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "isTransparent": false,
      "largeChartUrl": "",
      "displayMode": "regular",
      "width": 700,
      "height": 550,
      "colorTheme": "light",
      "symbol": symbol,
      "locale": "en"
    });

    container.current.appendChild(script);

    // Return a cleanup function to remove the script element when the component unmounts
    return () => {
      if (container.current && container.current.contains(script)) {
        container.current.removeChild(script);
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ width: '400px', height: '550px' }}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(FundamentalViewWidget);
