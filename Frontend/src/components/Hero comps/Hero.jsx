import Homecomp from "./Homecomp";
import ContentSensor from "./ContentSensor";
import Misinfo from "./Misinfo";
import AiChatBot from "./AiChatBot";
import GroupChat from "./GroupChat";
import ComplaintPortal from "./ComplaintPortal";
import { useState } from "react";
import '../styles/Hero.css'
import Trending from "./Trending";
function Hero({email}) {
  if (email) {
    console.log("mail is",email);
  } else {
    console.log("Nothing received");
  }
  const [comp, setComp] = useState(1);
  let componentToDisplay;
  switch (comp) {
    case 1:
      componentToDisplay = <Homecomp />;
      break;
    case 2:
      componentToDisplay = <ContentSensor />;
      break;
    case 3:
      componentToDisplay = <Misinfo />;
      break;
    case 4:
      componentToDisplay = <Trending/>;
      break;
    case 5:
      componentToDisplay = <GroupChat/>;
      break;
    case 6:
        componentToDisplay = <AiChatBot />;  
      break;
    case 7:
        componentToDisplay = <ComplaintPortal />; 
        break; 
    default:
      componentToDisplay = null;
  }
  return (
    <div>
      
  <div className="home-nav">
        <p onClick={()=>{setComp(1)}} className={comp === 1 ? "active-tab" : ""}>Home</p>
        <p onClick={()=>{setComp(2)}} className={comp === 2 ? "active-tab" : ""}>Abuse Censor</p>
        <p onClick={()=>{setComp(3)}} className={comp === 3 ? "active-tab" : ""}>Fact Check</p>
        <p onClick={()=>{setComp(4)}} className={comp === 4 ? "active-tab" : ""}>Trending</p>
        <p onClick={()=>{setComp(5)}} className={comp === 5 ? "active-tab" : ""}>Group Chat</p>
        <p onClick={()=>{setComp(6)}} className={comp === 6 ? "active-tab" : ""}>Gemini Chatbot</p>
        <p onClick={()=>{setComp(7)}} className={comp === 7 ? "active-tab" : ""}>Complaint Portal</p>
        
      </div>
      <div>
        {/* {
      email!=null && <p>{email}</p> 
        } */}
     {componentToDisplay}
      </div>   
    </div>
  );
}
export default Hero;
