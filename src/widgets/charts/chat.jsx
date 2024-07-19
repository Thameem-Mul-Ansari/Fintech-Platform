import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
 MainContainer,
 ChatContainer,
 MessageList,
 Message,
 MessageInput,
 TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const OPENAI_API_KEY = "your_openai_api_key";

function ChatUI() {
 // State to manage the typing indicator of the chatbot
 const [isChatbotTyping, setIsChatbotTyping] = useState(false);

 // State to store chat messages
 const [chatMessages, setChatMessages] = useState([
   {
     message: "Hello, I am Financial Assistant!",
     sender: "ChatGPT",
   },
 ]);

 // Function to handle user messages
 const handleUserMessage = async (userMessage) => {
   // Create a new user message object
   const newUserMessage = {
     message: userMessage,
     sender: "user",
     direction: "outgoing",
   };

   // Update chat messages state with the new user message
   const updatedChatMessages = [...chatMessages, newUserMessage];
   setChatMessages(updatedChatMessages);

   // Set the typing indicator for the chatbot
   setIsChatbotTyping(true);

   // Process user message with ChatGPT
   await processUserMessageToChatGPT(updatedChatMessages);
 };

 // Function to send the user message to ChatGPT API
 async function processUserMessageToChatGPT(messages) {
   // Prepare the messages in the required format for the API
   let apiMessages = messages.map((messageObject) => {
     let role = "";
     if (messageObject.sender === "ChatGPT") {
       role = "assistant";
     } else {
       role = "user";
     }
     return { role: role, content: messageObject.message };
   });

   // System message for ChatGPT
   const systemMessage = {
     role: "system",
     content: ` You are financial specialist who helps the customer to book profit. below are details of microsoft stock
     if i ask question related to microsoft you have go through the below content and tell me
     Previous Close	402.18
     Open	400.17
     Bid	410.14 x 1000
     Ask	410.15 x 900
     Day's Range	408.57 - 412.80
     52 Week Range	245.61 - 420.82
     Volume	13,430,198
     Avg. Volume	24,788,800
     Market Cap	3.052T
     Beta (5Y Monthly)	0.90
     PE Ratio (TTM)	37.14
     EPS (TTM)	11.06
     Earnings Date	Apr 23, 2024 - Apr 29, 2024
     Forward Dividend & Yield	3.00 (0.75%)
     Ex-Dividend Date	Feb 14, 2024
     1y Target Est	421.58

     TCS Stock Details:
Previous Close	4,012.10
Open	3,994.05
Bid	0.00 x 0
Ask	0.00 x 0
Day's Range	3,958.45 - 4,072.00
52 Week Range	3,070.25 - 4,184.75
Volume	1,744,040
Avg. Volume	2,237,785
Market Cap	14.705T
Beta (5Y Monthly)	0.54
PE Ratio (TTM)	33.10
EPS (TTM)	122.77
Earnings Date	Apr 10, 2024 - Apr 15, 2024
Forward Dividend & Yield	51.00 (1.27%)
Ex-Dividend Date	Jan 19, 2024
1y Target Est	3,971.80

Infosys Details:
Previous Close	1,606.50
Open	1,602.80
Bid	0.00 x 0
Ask	0.00 x 0
Day's Range	1,576.00 - 1,620.15
52 Week Range	1,185.30 - 1,733.00
Volume	6,420,178
Avg. Volume	6,452,630
Market Cap	6.696T
Beta (5Y Monthly)	0.56
PE Ratio (TTM)	27.51
EPS (TTM)	58.80
Earnings Date	Apr 11, 2024 - Apr 15, 2024
Forward Dividend & Yield	36.00 (2.24%)
Ex-Dividend Date	Oct 25, 2023
1y Target Est	1,653.83



ITC Stock Details:
Previous Close	406.15
Open	406.50
Bid	0.00 x 0
Ask	0.00 x 0
Day's Range	400.70 - 409.95
52 Week Range	369.65 - 499.70
Volume	11,103,079
Avg. Volume	14,398,367
Market Cap	5.091T
Beta (5Y Monthly)	0.27
PE Ratio (TTM)	24.79
EPS (TTM)	16.45
Earnings Date	May 16, 2024 - May 20, 2024
Forward Dividend & Yield	12.50 (3.08%)
Ex-Dividend Date	Feb 08, 2024
1y Target Est	502.35


     ` 
   };

   // Prepare the API request body
   const apiRequestBody = {
     model: "gpt-3.5-turbo",
     messages: [
       systemMessage, // System message should be in front of user messages
       ...apiMessages,
     ],
   };

   // Send the user message to ChatGPT API
   await fetch("https://api.openai.com/v1/chat/completions", {
     method: "POST",
     headers: {
       Authorization: "Bearer " + OPENAI_API_KEY,
       "Content-Type": "application/json",
     },
     body: JSON.stringify(apiRequestBody),
   })
     .then((data) => {
       return data.json();
     })
     .then((data) => {
       // Update chat messages with ChatGPT's response
       setChatMessages([
         ...messages,
         {
           message: data.choices[0].message.content,
           sender: "ChatGPT",
         },
       ]);
       // Set the typing indicator to false after getting the response
       setIsChatbotTyping(false);
     });
 }

 return (
   <>
     {/* A container for the chat window */}
     <div style={{ position: "relative", height: "80vh", width: "600px" }}>
       <MainContainer>
         <ChatContainer>
           {/* Display chat messages and typing indicator */}
           <MessageList
             typingIndicator={
               isChatbotTyping ? (
                 <TypingIndicator content="thinking" />
               ) : null
             }
           >
             {/* Map through chat messages and render each message */}
             {chatMessages.map((message, i) => {
               return (
                 <Message
                   key={i}
                   model={message}
                   style={
                     message.sender === "ChatGPT" ? { textAlign: "left" } : {}
                   }
                 />
               );
             })}
           </MessageList>
           {/* Input field for the user to type messages */}
           <MessageInput
             placeholder="Type Message here"
             onSend={handleUserMessage}
           />
         </ChatContainer>
       </MainContainer>
     </div>
   </>
 );
}

export default ChatUI;