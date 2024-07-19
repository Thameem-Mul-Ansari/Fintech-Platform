
const VITE_API_KEY = "UP7C9Z5NKKTW5FID"

export const fetchStockData = async(symbol) => {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${VITE_API_KEY}`)
    const data = await response.json()
    // console.log(data)
    return data
}

export default fetchStockData;
