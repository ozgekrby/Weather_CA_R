import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import './App.css';

export const WeatherContext = createContext();

const App = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState({ name: 'Istanbul', lat: 41.01, lon: 28.97 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city.name}&days=7&aqi=no&alerts=no`
                );

                const dailyData = response.data.forecast.forecastday;
                setWeatherData(dailyData);
                setError(null);
            } catch (err) {
                setError('Hava durumu verileri alınamadı.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city]);

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        switch (selectedCity) {
            case 'Istanbul':
                setCity({ name: 'Istanbul', lat: 41.01, lon: 28.97 });
                break;
            case 'Ankara':
                setCity({ name: 'Ankara', lat: 39.93, lon: 32.85 });
                break;
            case 'Izmir':
                setCity({ name: 'Izmir', lat: 38.42, lon: 27.14 });
                break;
            default:
                setCity({ name: 'Istanbul', lat: 41.01, lon: 28.97 });
        }
    };

    return (
        <WeatherContext.Provider value={{ weatherData, loading, error }}>
            <div className="app">
                <h1>Hava Durumu Raporu</h1>
                <select onChange={handleCityChange}>
                    <option value="Istanbul">İstanbul</option>
                    <option value="Ankara">Ankara</option>
                    <option value="Izmir">İzmir</option>
                </select>
                {loading && <p>Yükleniyor...</p>}
                {error && <p>{error}</p>}
                <div className="weather-cards">
                    {weatherData.map((day, index) => (
                        <WeatherCard key={index} data={day} />
                    ))}
                </div>
            </div>
        </WeatherContext.Provider>
    );
};

export default App;