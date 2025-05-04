import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../home/home.scss';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [numarPersoane, setNumarPersoane] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSearch = () => {
    window.scrollTo(0, 0);
    if (endDate <= startDate) {
      setErrorMessage('Date introduse greșit!');
    } else {
      setErrorMessage('');
      navigate('/availablerooms', {
        state: { startDate, endDate, capacity: numarPersoane },
      });
    }
  };

  const changePage = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleIncrement = () => setNumarPersoane((prev) => prev + 1);
  const handleDecrement = () =>
    setNumarPersoane((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="main">
      <h1>
        Pensiunea <i>"La Munte"</i>
      </h1>

      <div className="content">
        {/* Right side */}
        <div className="right">
          <h2>O destinație pentru relaxare, aventură și amintiri frumoase</h2>
          <button onClick={() => changePage('/rooms')}>
            Vezi camerele noastre
          </button>
        </div>

        {/* Left side */}
        <div className="left">
          <div className="background">
            <div className="form-container">
              {errorMessage && <h3>{errorMessage}</h3>}

              <label>Data de început:</label>
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                dateFormat="dd MMMM yyyy"
                className="date-box"
              />

              <label>Data de plecare:</label>
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                dateFormat="dd MMMM yyyy"
                className="date-box"
              />

              <label>Persoane în cameră:</label>
              <div className="persoane-control">
                <button onClick={handleDecrement}>-</button>
                <span>{numarPersoane}</span>
                <button onClick={handleIncrement}>+</button>
              </div>

              <button className="submit-button" onClick={handleSearch}>
                Vezi camere disponibile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
