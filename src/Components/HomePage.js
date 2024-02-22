import React, { useEffect, useState } from 'react';
import "../Styles/HomePage.css";
import Card from './Card';

const HomePage = () => {
    const [currentUrl, setCurrentUrl] = useState("https://swapi.dev/api/planets/?format=json");
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [planets, setPlanets] = useState([]);
    const [count, setCount] = useState(1);
    const [currentPlanet, setCurrentPlanet] = useState({});

    useEffect(() => {
        fetchPlanets(currentUrl);
    }, [currentUrl]);


    async function fetchPlanets(url){
        try{
            const response = await fetch(url);
            const data = await response.json();
            setPrevPage(data.previous);
            setNextPage(data.next);
            setPlanets(data.results);
            setCurrentPlanet(data.results[0]);
        }catch(e){
            console.error(e.message);
        }
        finally{
            setLoading(false);
        }
    };

    const handlePlanetsClick = (e) => {
        const planetName = e.target.textContent;
        const planetObject = planets.find((planet) => planet.name === planetName);
        setCurrentPlanet(planetObject);
    };

    const handlePrevClick = () => {
        setLoading(true);
        setCurrentUrl(prevPage);
        setCount(count - 1);
    };

    const handleNextClick = () => {
        setLoading(true);
        setCurrentUrl(nextPage);
        setCount(count + 1);
    };
  
    return (
        <>
        <div className='buttons-div'>
            <button disabled = {prevPage ? false : true } onClick={handlePrevClick}>Prev</button>
            <span>Page: {count}</span>
            <button disabled = {nextPage ? false : true } onClick={handleNextClick}>Next</button>
        </div>
        {!loading ? 
            <div className='homepage-content'>
                <div className='planets-names'>
                    <h4>PLANETS</h4>
                    {planets.map((planet) => (
                        <div onClick={handlePlanetsClick} key={planet.name} className='planet-name'>{planet.name}</div>
                    ))}
                </div>
                <Card planet={currentPlanet} />
            </div> :
            <div className='loading-msg'>Loading...</div>}
        </>
    );
};

export default HomePage;