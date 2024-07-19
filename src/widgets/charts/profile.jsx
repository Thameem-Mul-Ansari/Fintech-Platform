import React, { useEffect, useRef, memo } from 'react';

const Profilestatus = ({ symbol }) => {
  const containerRef = useRef();

  useEffect(() => {
    


   
    const script = document.createElement('script');
    script.async = true;

    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
        "width": "600",
        "height": "700",
        "symbol": symbol,
         // Use widgetConfig.symbol instead of ""
        "locale": "en",
        "colorTheme": "light",
        "isTransparent": false
    });
    containerRef.current.appendChild(script);

    return () => {
        if (containerRef.current && containerRef.current.contains(script)) {
            containerRef.current.removeChild(script);
        }
      };
    }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      
    </div>
  );
};

export default memo(Profilestatus);
