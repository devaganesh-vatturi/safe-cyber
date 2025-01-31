import { useState } from "react";
import '../styles/Text.css';
import axios from "axios";
const Text =()=>{
    const [tdata,setData]=useState("");
    const [sdata,setSdata]=useState("data");
    let [flag,setFlag ]=useState(true);
    const handleChange=(e)=>{
      setData(e.target.value);
    }
    const handleSubmit =async()=>{
        try{
         await axios.post('https://safecyber-api.onrender.com/api/contsensor-text',tdata).then(response=>{
         if(response.data.success)
         {
           setSdata(response.data.sdata);
           const issensd = response.data.sensored;
         setFlag(true);
         }
        })
        }
        catch(e)
        {
         console.log(e);
        }
    }
   return(
    <div>
     <input className='text-inp' onChange={handleChange} />
     <button onClick={handleSubmit}>Submit</button>
     { flag &&
       <div>
         <p>{sdata}</p>
       </div>
     }
    </div>
   );
 }
 export default Text;