import React, { useState, useEffect } from "react";

function StarShips() {
  const [state, setState] = useState({ starships: [], isLoading: true });

  useEffect(() => {
    async function fetchStarships() {
      try {
        const response = await fetch("https://swapi.dev/api/starships/");
        if (response.ok) {
          const data = await response.json();
          const allStarships = data.results;

          if (Array.isArray(allStarships)) {
            const randomStarships = shuffleArray(allStarships);

            setState({
              starships: randomStarships.slice(0, 10),
              isLoading: false,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching starships:", error);
      }
    }

    fetchStarships();
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function toggleFlip(index) {
    const updatedStarships = [...state.starships];
    updatedStarships[index].isFlipped = !updatedStarships[index].isFlipped;
    setState({ starships: updatedStarships, isLoading: state.isLoading });
  }

  return (
    <div>
      <h2>Starships</h2>
      <p>Click on a ship to learn more</p>
      {state.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {state.starships.map((starship, index) => (
            <li
              key={starship.name}
              onClick={() => toggleFlip(index)} // Toggle flip on click
              className={starship.isFlipped ? "flipped" : ""}
            >
              {starship.name}
              <div className="back">
                <p>Crew: {starship.crew}</p>
                <p>Cost in Credits: {starship.cost_in_credits}</p>
                <p>Passengers: {starship.passengers}</p>
                <p>Model: {starship.model}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StarShips;
