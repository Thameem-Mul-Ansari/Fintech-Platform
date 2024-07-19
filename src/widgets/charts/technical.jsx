import React, { useEffect, useRef, memo } from 'react';

const Technical = ({ symbol }) => {
  const containerRef = useRef();

  useEffect(() => {
  

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.async = true;

    script.innerHTML = 
    JSON.stringify({
        "interval": "1m",
        "width": "425",
        "isTransparent": false,
        "height": "450",
        "symbol": symbol,
        "showIntervalTabs": true,
        "displayMode":"single",
        "locale": "en",
        "colorTheme": "light"
      });
    ;

    containerRef.current.appendChild(script);

    return () => {
      containerRef.current.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      
    </div>
  );
};

export default memo(Technical);
