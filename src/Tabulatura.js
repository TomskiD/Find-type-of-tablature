import React from 'react';
import './Tabulatura.css';

const Tabulatura = ({ title, artist, tabulatura}) => {
  return (
    <div className='tab'>
      <h1 className='header-song' >{title} </h1>
      <p className='header-text' > tablature presented: </p>
      <ul className='list'>
        {tabulatura.map((tab,index) => (<li key={index}>  {tab}  </li>))}
      </ul>
      <h2 className='header-artist' > Artist: {artist} </h2>
    </div>
  );
}

export default Tabulatura 