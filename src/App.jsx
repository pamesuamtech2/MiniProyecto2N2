import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainDashboard from './components/MainDashboard';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('C');
  const [isLoading, setIsLoading] = useState(true);

  //  FUNCION DE BÚSQUEDA MANUAL 
  const fetchWeatherByCity = async (city) => {
    setIsLoading(true);
    try {
      const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3744ba78617888d8737694d95edf3f0a&units=metric`);
      const currentData = await currentRes.json();
      const { lat, lon } = currentData.coord;
      
      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3744ba78617888d8737694d95edf3f0a&units=metric`);
      const forecastData = await forecastRes.json();
      
      setWeatherData({ 
        current: currentData, 
        forecast: forecastData 
      });
      
      console.log("¡Éxito! Clima Actual:", currentData);
      console.log("¡Éxito! Pronóstico 5 días:", forecastData);

    } catch (error) {
      console.error("Error al buscar la ciudad. Revisa el nombre o tu conexión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //  FUNCIÓN DE GPS 
  const fetchWeatherByLocation = async () => {
    setIsLoading(true);
    try {
      // Coordenadas de ipinfo
      const ipResponse = await fetch('https://ipinfo.io/json?token=c9db92b9fcda66');
      const ipData = await ipResponse.json();
      const [lat, lon] = ipData.loc.split(',');

      // Peticiones a OpenWeather 
      const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3744ba78617888d8737694d95edf3f0a&units=metric`);
      const currentData = await currentRes.json();

      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3744ba78617888d8737694d95edf3f0a&units=metric`);
      const forecastData = await forecastRes.json();

      setWeatherData({
        current: currentData,
        forecast: forecastData
      });

    } catch (error) {
      console.error("Error obteniendo ubicación:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return (
    <div className="min-h-screen bg-[#100E1D] font-weather grid grid-cols-1 lg:grid-cols-4">
      <div className="lg:col-span-1 bg-[#1E213A]">
        <Sidebar 
          weatherData={weatherData} 
          onSearch={fetchWeatherByCity} 
          onGetLocation={fetchWeatherByLocation}
          unit={unit} 
        />
      </div>
      <div className="lg:col-span-3">
        <MainDashboard 
          weatherData={weatherData} 
          unit={unit} 
          setUnit={setUnit} 
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default App;