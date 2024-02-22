import React, { useEffect, useState } from 'react';
import "../Styles/Resident.css";

const Resident = ({url}) => {
    const [residentDetails, setResidentDetails] = useState({});
    const [residentLoading, setResidentLoading] = useState(true);

    useEffect(() => {
        fetchDetails(url);
    }, [url]);

    async function fetchDetails(url){
      try{
        const response = await fetch(url);
        const data = await response.json();
        setResidentDetails(data);
      }catch(e){
        console.error(e.message);
      }
      finally{
        setResidentLoading(false);
      }
  };

  return (
    <>
      <div className='resident-wrapper'>
        {!residentLoading ? 
          <>
            <span>Name: {residentDetails.name?.toUpperCase()}</span>
            <span>Height: {residentDetails.height?.toUpperCase()}</span>
            <span>Mass: {residentDetails.mass?.toUpperCase()}</span>
            <span>Gender: {residentDetails.gender?.toUpperCase()}</span>
          </> : 
          <span>Resident Details Loading...</span>
        }
      </div>
    </> 
  );
};

export default Resident;