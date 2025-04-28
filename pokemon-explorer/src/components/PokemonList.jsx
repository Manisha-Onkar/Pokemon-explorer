import React from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

function PokemonList({ pokemon }) {
  return (
    <div className="pokemon-list">
      {pokemon.map((poke) => (
        <PokemonCard key={poke.id} pokemon={poke} />
      ))}
    </div>
  );
}

export default PokemonList;
