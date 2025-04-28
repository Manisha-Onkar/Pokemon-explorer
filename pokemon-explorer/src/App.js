import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonList from './components/PokemonList';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();
        const promises = data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()));
        const results = await Promise.all(promises);
        setPokemonData(results);
        setFilteredData(results);
        setLoading(false);
      } catch (err) {
        setError('Failed to load Pokémon. Please try again.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const filtered = pokemonData.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType
        ? pokemon.types.some((t) => t.type.name === selectedType)
        : true;
      return matchesName && matchesType;
    });
    setFilteredData(filtered);
  }, [searchTerm, selectedType, pokemonData]);

  return (
    <div className="app">
      <Header />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TypeFilter setSelectedType={setSelectedType} />
      {loading ? (
        <p className="status">Loading Pokémon...</p>
      ) : error ? (
        <p className="status error">{error}</p>
      ) : filteredData.length === 0 ? (
        <p className="status">No Pokémon match your search.</p>
      ) : (
        <PokemonList pokemon={filteredData} />
      )}
    </div>
  );
}

export default App;
