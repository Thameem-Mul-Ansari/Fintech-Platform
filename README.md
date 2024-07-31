# AI Algorithmic Trader & AI Portfolio Management Guide  
   
## Description  
   
### Overview  
The AI Algorithmic Trader and AI Portfolio Management Guide are comprehensive trading platforms that use advanced artificial intelligence techniques to analyze financial markets and make informed trading decisions. They integrate cutting-edge technologies, including sentiment analysis using FinBert, to gather and process news and market data in real time.  
   
### Features  
#### User-Friendly Dashboard  
- Comprehensive overview of all assets including stocks, bonds, commodities, and cryptocurrencies.  
- Real-time market data, asset performance metrics, and key financial indicators.  
- Customizable dashboard layout and selection of preferred assets for monitoring.  
   
#### Sentiment Analysis with FinBert  
- The platform utilizes the FinBert model for sentiment analysis from diverse sources.  
- News sentiment is categorized as positive, negative, or neutral, and relevant information is extracted for trading decisions.  
- Sentiment analysis results are incorporated into the trading algorithm to assess market sentiment and its impact on asset prices.  
   
#### Trading Algorithm  
- A combination of machine learning algorithms and traditional financial models is used to make accurate predictions.  
- Various parameters such as asset price movements, trading volumes, historical data, and sentiment analysis results are considered.  
- Position sizing and risk management techniques are applied to optimize trading strategies and maximize returns while minimizing risks.  
   
#### AI Agents for Report Generation  
- The platform features three AI agents: research analyst, financial analyst, and investment analyst.  
- Comprehensive reports including investment recommendations and risk assessments are generated.  
   
## Tech Stack  
- React  
- Fastapi  
- AI Models: Finbert, LLMs  
- Embedding Models: jinaai/jina-colbert-v1-en, HuggingfaceEmbeddings  
- Vector Database: FAISS, ChromaDb  
- Realtime Financial Dataset: Yahoo, FINHUB, Youtube Financial Video dataset  
   
## Installation & Running the Application  
1. Install all packages  
```bash  
npm install  
```  
2. Run the application  
```bash  
npm run dev  
```  
3. FastApi Backend  
```bash  
cd . /stock  
uvicorn run main:app run  
```
## OUTPUT
![image](https://github.com/user-attachments/assets/61c9e4ea-a95c-46c0-80f8-95dc81725440)
![image](https://github.com/user-attachments/assets/f4bdb663-c4de-410a-a588-6820ec958c32)
![image](https://github.com/user-attachments/assets/477dddb2-c26f-4b10-8b01-16b42021d71c)
![image](https://github.com/user-attachments/assets/db4f96db-6448-41e9-9b82-21c2184aee37)
![image](https://github.com/user-attachments/assets/3e1d8bfc-ec0b-4eb5-835b-d531252cff58)

   
## Conclusion  
The platform leverages cutting-edge technologies such as machine learning, natural language processing, and real-time data APIs to empower users to make informed trading decisions in dynamic financial markets. It seamlessly integrates AI agents, large language models, and trading apps to streamline the trading process and deliver actionable insights to users via an intuitive UI dashboard.  
   
## Uniqueness & Comparison  
The AI Algorithmic Trader differentiates itself with advanced data analysis, real-time monitoring, sentiment analysis integration, a user-friendly dashboard, an AI algorithm for trading, and AI agents for report generation. Compared to existing solutions, the platform offers superior capabilities in real-time analysis, integration of multiple data sources, user-friendly interface, sophisticated AI-driven trading algorithm, and comprehensive AI-generated reports.s
