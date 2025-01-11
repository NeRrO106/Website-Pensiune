import React, {useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./home.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const [numarPersoane, setNumarPersoane] = useState(1);

  const [language, setLanguage] = useState('RO');

  const [errorMessage, setErrorMessage] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const decrement = ()=>{
    if(numarPersoane > 1) setNumarPersoane(numarPersoane - 1);
  }

  const increment = () => {
    setNumarPersoane(numarPersoane + 1);
  }

  const changeLanguage = (value) =>{
    setLanguage(value);
  }

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate('/rooms');
  };

  const handleSearch = ()=>{
    window.scrollTo(0, 0);
    if(endDate <= startDate){
      setErrorMessage('Date introduse gresit!');
    }
    else{
      setErrorMessage('');
      navigate('/availablerooms', {state: { startDate, endDate, capacity: numarPersoane } });
    }
  };
  return (
    <div className='main'>
      <h1>Pensiunea <i>"La Munte"</i></h1>
      <div className="dropdown">
        <button className="btn dropdown-toggle btn-sm" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          {language}
        </button>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li><button className="dropdown-item" onClick={() => changeLanguage('RO')}>RO</button></li>
          <li><button className="dropdown-item" onClick={() => changeLanguage('EN')}>EN</button></li>
          <li><button className="dropdown-item" onClick={() => changeLanguage('BG')}>BG</button></li>
        </ul>
      </div>
      <div className='content'>
        <div className='right'>
            <h2>O destinatie pentru relaxare, aventura si amintiri frumoase</h2>
            <button onClick={() => handleClick()}>Vezi camerele noastre</button>
        </div>
        <div className='left'>
            <div className='background'>
              <div className="form-container">
                <h3>{errorMessage}</h3>
                <label>Data de inceput:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd MMMM yyyy"
                  className='date-box'
                />

                <label>Data de plecare:</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd MMMM yyyy"
                  className='date-box'
                />

                <label>Persoane in camera:</label>
                <div className="persoane-control">
                  <button className='btn-label' onClick={decrement}>-</button>
                    <span>{numarPersoane}</span>
                  <button className='btn-label' onClick={increment}>+</button>
                </div>

                <button className="submit-button" onClick={() => handleSearch()}>Vezi camere disponibile</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Home;
