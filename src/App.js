import React, { useEffect, useState } from 'react';
import Tabulatura from './Tabulatura'
import './App.css'

const App = () => {
    const [tab, setTab] = useState([]); // przechowywanie danych z API songsterr
    const [search, setSearch] = useState(''); // szukanie elementu 
    const [query, setQuery] = useState(''); // zapytanie do sentu z tablicy
    const [select, setSelect] = useState([]); // wybieranie elementu z tablicy


    useEffect(() => {
        getTabulatura();
    }, [query]);

    // poprawienie nazw tablicy tabTypes = []
    const mapper = {
        PLAYER: 'player',
        TEXT_GUITAR_TAB: 'guitar',
        CHORDS: 'chords',
        TEXT_BASS_TAB: 'bass'
    }

    const getTabulatura = async () => {
        const response = await fetch(`http://www.songsterr.com/a/ra/songs.json?pattern=${query}`);
        const data = await response.json();
        // Zmiana nazewnictwa tabulatur 
        const newData = data.map(({ tabTypes, ...other }) => ({
            tabTypes: tabTypes.map(type => mapper[type]), ...other
        }));

        setTab(newData);
    }

    const updateSearch = e => {
        setSearch(e.target.value);
    }

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
    }

    const tabChange = e => {
        const filteredData = tab.filter(tabItem => tabItem.tabTypes.some(type => type === e.target.value))
        setSelect(filteredData)
    }



    return (
        <div className="App">
            <div className="container">
                <h1 className="header-title">Find the music type of tablature !</h1>
                <form onSubmit={getSearch} className="search-form" >
                    <input className="search-bar" placeholder="Write artist/song" value={search} onChange={updateSearch} />
                    <select className="select-tab" onChange={tabChange} >
                        <option value="none" > --Choose tab-- </option>
                        <option value="chords" > chords </option>
                        <option value="bass" > bass </option>
                        <option value="guitar" > guitar </option>
                        <option value="player" > player </option> </select>
                    <button className="search-button" type='submit' >Search </button>
                </form>
                <div className="tabulatury" > {
                    select.map(tabType => (<Tabulatura
                        title={tabType.title}
                        artist={tabType.artist.name}
                        tabulatura={tabType.tabTypes}
                        key={tabType.id}
                    />
                    ))};
                </div>
            </div>
        </div>
    );
}

export default App