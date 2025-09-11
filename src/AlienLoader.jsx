import React from "react";
import "./AlienLoader.css";

export default function AlienLoader() {
  return (
    <div className="alien-loader-container">
      <img  
        src="logotransparent.png"
        alt="Loading..."
        className="alien-pulse"
      />
      <div className="booting-text">Initializing ECO SHIELD...</div>
    </div>
  );
}



// import React from 'react';
// import './AlienLoader.css';

// export default function AlienLoader() {
//   return (
//     <div className="hacker-alien-container">
//       <div className="console">
//         <p className="console-text">Initializing Eco Shield System...</p>
//         <p className="console-text">Connecting to Intergalactic Mainframe...</p>
//         <p className="console-text blink">ACCESS GRANTED</p>
//       </div>

//       <div className="alien">
//         <div className="head">
//           <div className="eye left-eye"></div>
//           <div className="eye right-eye"></div>
//         </div>
//         <div className="body"></div>
//       </div>
//     </div>
//   );
// }
