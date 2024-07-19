import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

export function Profile() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const socket = io("http://localhost:5000");  
  
  useEffect(() => {
    socket.on("update", (data) => {
      setResult((prevResult) => prevResult + data.result + "\n");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAnalysis = async () => {
    try {
      const response = await axios.post("http://localhost:5000/run_financial_analysis", { company: query });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold mb-6">📈 SYSTEM 2 THINKING ADVISOR 🚀</h1>
      <div className="flex" style={{ marginTop: "20px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter the stock"
        className="border p-3 rounded-md"
        style={{
          width: "500px",
          height: "50px",
          borderRadius: "30px",
          border: "2px solid black",
          boxSizing: "border-box",
          verticalAlign: "top",
        }}
      />
      </div>
      <div className="flex" style={{ marginTop: "20px" }}>
        <textarea
          placeholder="Answer will be displayed here"
          value={result}
          readOnly
          className="border p-3 rounded-md"
          style={{
            width: "500px",
            height: "300px",
            borderRadius: "30px",
            border: "2px solid black",
            boxSizing: "border-box",
            verticalAlign: "top",
            marginLeft: "20px",
          }}
        />
      </div>
      <div className="mt-4" style={{ marginTop: "40px" }}>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAnalysis}
        >
          PROVIDE YOUR OPINION
        </button>
      </div>
    </div>
  );
}

export default Profile;
