import ForecastCard from './ForecastCard';
import HighlightCard from './HighlightCard';

const getWindDirection = (deg) => {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
};

function MainDashboard({ className = '', weatherData, unit, setUnit, isLoading }) {

  if (!weatherData) {
    return (
      <main className={`p-4 pt-8 lg:p-8 lg:px-24 bg-[#100E1D] min-h-screen flex flex-col justify-center items-center ${className}`}>
        <p className="text-white font-weather animate-pulse text-xl">Cargando panel principal...</p>
      </main>
    );
  }

  const current = weatherData.current;
  const windSpeed = current.wind.speed;
  const windDeg = current.wind.deg; 
  const humidity = current.main.humidity;
  const airPressure = current.main.pressure;
  const visibilityKm = (current.visibility / 1000).toFixed(1);

  const windDirectionText = getWindDirection(windDeg);

  const dailyForecast = weatherData.forecast.list.filter(reading => {
    return reading.dt_txt.includes("12:00:00");
  }).slice(0, 5); 

  const formatCardDate = (dateString, index) => {
    if (index === 0) return "Tomorrow";
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    }).replace(',', '');
  };

  return (
    <main className={`p-4 pt-8 lg:p-8 lg:px-24 bg-[#100E1D] min-h-screen flex flex-col justify-between ${className}`}>
      
      <div className="flex justify-end gap-4 mb-6 lg:mb-4">
        <button 
          onClick={() => setUnit('C')}
          className={`${unit === 'C' ? 'bg-white text-[#100E1D]' : 'bg-[#585676] text-white hover:bg-gray-400'} font-bold rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition`}
        >
          °C
        </button>
        <button 
          onClick={() => setUnit('F')}
          className={`${unit === 'F' ? 'bg-white text-[#100E1D]' : 'bg-[#585676] text-white hover:bg-gray-400'} font-bold rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition`}
        >
          °F
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-8 lg:mb-4">
        {dailyForecast.map((day, index) => {
          const maxTemp = Math.round(day.main.temp_max);
          const minTemp = Math.round(day.main.temp_min);
          const dateLabel = formatCardDate(day.dt_txt, index);
          const dailyIconCode = day.weather[0].icon;
                    
          return (
            <ForecastCard 
              key={day.dt}
              date={dateLabel} 
              iconCode={dailyIconCode} 
              max={maxTemp} 
              min={minTemp}
              unit={unit} 
            />
          );
        })}
      </div>

      <h2 className="text-2xl font-bold mb-4 lg:mb-2 font-weather text-white">
        Today's Highlights
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4 pb-6 lg:pb-2">
        <HighlightCard title="Wind status" value={windSpeed} unit="ms">
          <div className="flex items-center gap-2">
            <div className="bg-[#585676] rounded-full w-8 h-8 flex items-center justify-center">
              <img 
                src="/flecha.png" 
                alt="Wind direction arrow" 
                className="w-4 h-4 invert transition-transform duration-500 ease-in-out" 
                style={{ transform: `rotate(${windDeg}deg)` }} 
              />
            </div>
            <span className="text-[#E7E7EB] text-sm font-medium uppercase">{windDirectionText}</span>
          </div>
        </HighlightCard>

        <HighlightCard title="Humidity" value={humidity} unit="%">
          <div className="w-full px-6 text-[#A09FB1] text-xs font-bold flex flex-col gap-1">
            <div className="flex justify-between w-full">
              <span>0</span><span>50</span><span>100</span>
            </div>
            <div className="w-full h-2 bg-[#E7E7EB] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FFEC65] rounded-full transition-all duration-1000"
                style={{ width: `${humidity}%` }}
              ></div>
            </div>
            <span className="text-right text-[#A09FB1]">%</span>
          </div>
        </HighlightCard>

        <HighlightCard title="Visibility" value={visibilityKm} unit="km" />
        <HighlightCard title="Air Pressure" value={airPressure} unit="mb" />
      </div>

      <footer className="text-center text-[#A09FB1] font-weather text-sm font-medium">
        created by <span className="font-bold underline">TuNombre</span> - devChallenges.io
      </footer>
    </main>
  );
}

export default MainDashboard;