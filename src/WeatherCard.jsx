const WeatherCard = ({ data }) => {
    const date = new Date(data.date); 
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

    const today = new Date();
    const isToday = date.toDateString() === today.toDateString(); 

    return (
        <div className={`weather-card ${isToday ? 'today' : ''}`}>
            <h3>{days[date.getDay()]}</h3>
            <img
                src={data.day.condition.icon}
                alt={data.day.condition.text}
            />
            <p>{data.day.condition.text}</p>
            <p>En Yüksek: {Math.round(data.day.maxtemp_c)}°C</p>
            <p>En Düşük: {Math.round(data.day.mintemp_c)}°C</p>
        </div>
    );
};

export default WeatherCard;