import React from 'react';
import "../Styles/Card.css";
import Resident from './Resident';

const Card = ({planet}) => {
  return (
    <div className='card-container'>
        <h4>Planet Details</h4>
        <span>Name: {planet.name?.toUpperCase()}</span>
        <span>Climate: {planet.climate?.toUpperCase()}</span>
        <span>Population: {planet.population?.toUpperCase()}</span>
        <span>Terrain: {planet.terrain?.toUpperCase()}</span>
        <span>Surface Water: {planet.surface_water}</span>
        <span>Residents: {planet.residents?.length !== 0 ? <></> : <span>No Residents</span>}</span>
        <div className='residents-container'>
            {planet.residents?.length !== 0 ? 
              planet.residents?.map((resident) => <Resident key={resident} url={resident}/>) 
              : <></>}
        </div>
    </div>
  );
};

export default Card;