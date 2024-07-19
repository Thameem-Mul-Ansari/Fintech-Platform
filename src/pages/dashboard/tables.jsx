import React, { useState } from "react";
import axios from "axios";

import "./Avatar.css";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import { createAvatarSynthesizer, createWebRTCConnection } from "./Utility";
import { avatarAppConfig } from "./config";
import { useRef } from "react";



export function Tables() {

  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  
  // Azure's avatar's code starting from here

  const [avatarSynthesizer, setAvatarSynthesizer] = useState(null);
    const myAvatarVideoEleRef = useRef();
    const myAvatarAudioEleRef = useRef();
    var [mySpeechText, setMySpeechText] = useState("");
    
    var iceUrl = avatarAppConfig.iceUrl
    var iceUsername = avatarAppConfig.iceUsername
    var iceCredential = avatarAppConfig.iceCredential

    const handleSubmit = async () => {
      try {
        const response = await axios.post("http://localhost:5001/get_answer", {
          question: query,
        });
  
  
        setAnswer(response.data.answer);
        mySpeechText = response.data.answer ;
    
        console.log(response.data.answer);
        speakSelectedText() ;
        
      } catch (error) {
        console.error("Error fetching answer:", error.response?.data || error.message);
      }
    }

    


    const handleOnTrack = (event) => {

        console.log("#### Printing handle onTrack ",event);
    
        // Update UI elements
        console.log("Printing event.track.kind ",event.track.kind);
        if (event.track.kind === 'video') {
            const mediaPlayer = myAvatarVideoEleRef.current;
            mediaPlayer.id = event.track.kind;
            mediaPlayer.srcObject = event.streams[0];
            mediaPlayer.autoplay = true;
            mediaPlayer.playsInline = true;
            mediaPlayer.addEventListener('play', () => {
            window.requestAnimationFrame(()=>{});

          });
        } else {
          const audioPlayer = myAvatarAudioEleRef.current;
          audioPlayer.srcObject = event.streams[0];
          audioPlayer.autoplay = true;
          audioPlayer.playsInline = true;
          audioPlayer.muted = true;
        }
      };

    const stopSpeaking = () => {
        avatarSynthesizer.stopSpeakingAsync().then(() => {
          console.log("[" + (new Date()).toISOString() + "] Stop speaking request sent.")
    
        }).catch();
    }  

    const stopSession = () => {

        try{
          //Stop speaking
          avatarSynthesizer.stopSpeakingAsync().then(() => {
            console.log("[" + (new Date()).toISOString() + "] Stop speaking request sent.")
            // Close the synthesizer
            avatarSynthesizer.close();
          }).catch();
        }catch(e) {
        }
      }

    const speakSelectedText = () => {
        //Start speaking the text
        const audioPlayer = myAvatarAudioEleRef.current;
        console.log("Audio muted status ",audioPlayer.muted);
        console.log(mySpeechText) ;
        audioPlayer.muted = false;        
        avatarSynthesizer.speakTextAsync(mySpeechText).then(
            (result) => {
                if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                    console.log("Speech and avatar synthesized to video stream.")
                } else {
                    console.log("Unable to speak. Result ID: " + result.resultId)
                    if (result.reason === SpeechSDK.ResultReason.Canceled) {
                        let cancellationDetails = SpeechSDK.CancellationDetails.fromResult(result)
                        console.log(cancellationDetails.reason)
                        if (cancellationDetails.reason === SpeechSDK.CancellationReason.Error) {
                            console.log(cancellationDetails.errorDetails)
                        }
                    }
                }
        }).catch((error) => {
            console.log(error)
            avatarSynthesizer.close()
        });
    }

    const startSession = () => {

        let peerConnection = createWebRTCConnection(iceUrl,iceUsername, iceCredential);
        console.log("Peer connection ",peerConnection);
        peerConnection.ontrack = handleOnTrack;
        peerConnection.addTransceiver('video', { direction: 'sendrecv' })
        peerConnection.addTransceiver('audio', { direction: 'sendrecv' })
        
        let avatarSynthesizer = createAvatarSynthesizer();
        setAvatarSynthesizer(avatarSynthesizer);
        peerConnection.oniceconnectionstatechange = e => {
            console.log("WebRTC status: " + peerConnection.iceConnectionState)
    
            if (peerConnection.iceConnectionState === 'connected') {
                console.log("Connected to Azure Avatar service");
            }
    
            if (peerConnection.iceConnectionState === 'disconnected' || peerConnection.iceConnectionState === 'failed') {
                console.log("Azure Avatar service Disconnected");
            }
        }
    
        avatarSynthesizer.startAvatarAsync(peerConnection).then((r) => {
            console.log("[" + (new Date()).toISOString() + "] Avatar started.")
    
        }).catch(
            (error) => {
                console.log("[" + (new Date()).toISOString() + "] Avatar failed to start. Error: " + error)
            }
        );
    };
  
  return (
    <div className="mt-12 mb-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold mb-6">📈 PERSONALISED FINANCIAL ADVISOR 🚀</h1>
      <div className="flex" style={{ marginTop: "20px" }}>
      <textarea
        placeholder="Enter your query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-3 rounded-md"
        style={{
          width: "500px",
          height: "300px",
          borderRadius: "30px",
          border: "2px solid black",
          boxSizing: "border-box",
          verticalAlign: "top",
        }}
      />
      
        <div id="myAvatarVideo" className="myVideoDiv"
        placeholder="Press the Connect button"
        value={answer}
        readOnly
        style={{
          width: "500px",
          height: "300px",
          // borderRadius: "30px",
          // border: "2px solid black",
          boxSizing: "border-box",
          verticalAlign: "top",
          marginLeft: "20px",
        }}>
                        
            <video ref={myAvatarVideoEleRef}>

            </video>

            <audio ref={myAvatarAudioEleRef}>

            </audio>
        </div>
    
      
      <div className="twobuttons">
      <div className="myButtonGroup d-flex justify-content-around">
                        <button className="btn btn-success"
                            onClick={startSession}>
                            Connect
                        </button>
      </div>
      <div className="myButtonGroup d-flex justify-content-around">
      <button className="btn btn-danger"
                            onClick={stopSession}>
                            Disconnect
                        </button>
      </div>
      </div>
      </div>


      <div className="mt-4" style={{ marginTop: "40px" }}>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSubmit}
        >
          PROVIDE YOUR OPINION
        </button>
      </div>
    </div>
  );
}

export default Tables;