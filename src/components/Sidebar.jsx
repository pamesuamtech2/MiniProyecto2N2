import { useState } from 'react';

function Sidebar({ className = '', weatherData, onSearch, onGetLocation, unit }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = () => {
    if (searchValue.trim() !== "") {
      onSearch(searchValue); 
      setIsSearchOpen(false); 
      setSearchValue(""); 
    }
  };

  if (!weatherData) {
    return (
      <aside className={`bg-[#1E213A] flex flex-col min-h-screen justify-center items-center text-white ${className}`}>
        <p className="text-2xl font-weather animate-pulse text-[#A09FB1]">Cargando clima...</p>
      </aside>
    );
  }

  const current = weatherData.current;
  let temperature = Math.round(current.main.temp); 
  
  if (unit === 'F') {
    temperature = Math.round((temperature * 1.8) + 32);
  }

  const weatherCondition = current.weather[0].main;
  const weatherIcon = current.weather[0].icon;
  const cityName = current.name;

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  }).replace(',', '');

  return (
    <aside className={`bg-[#1E213A] flex flex-col min-h-screen relative overflow-x-hidden ${className}`}>
      
      {isSearchOpen && (
        <div className="absolute inset-0 bg-[#1E213A] z-50 p-6 flex flex-col">
          <div className="flex justify-end mb-8">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="text-white text-3xl font-bold hover:text-gray-400 transition"
            >
              &times;
            </button>
          </div>

          <div className="flex gap-4 h-12">
            <div className="flex-1 border border-[#E7E7EB] flex items-center px-3 gap-3">
              <span className="text-[#616475] text-xl">🔍</span>
              <input 
                type="text" 
                placeholder="search location"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} 
                className="bg-transparent w-full text-[#E7E7EB] outline-none placeholder-[#616475] font-weather"
              />
            </div>
            <button 
              onClick={handleSearchClick} 
              className="bg-[#3C47E9] text-[#E7E7EB] px-5 font-semibold hover:bg-blue-600 transition font-weather"
            >
              Search
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center w-full p-6 md:p-8 z-10">
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="bg-[#6E707A] text-[#E7E7EB] px-4 py-2 shadow-md hover:bg-gray-500 transition"
        >
          Search for places
        </button>

        <button 
          onClick={onGetLocation} 
          className="bg-[#6E707A] rounded-full p-2 shadow-md flex items-center justify-center hover:bg-gray-500 transition cursor-pointer"
        >
          <img src="/location.svg" alt="location sign" className="w-5 h-5" />
        </button>
      </div>
      
      <div className="relative flex justify-center items-center w-full mt-4 h-64">
        <img 
          src="/nubes.png" 
          alt="Background clouds" 
          className="absolute inset-0 w-full h-full object-cover opacity-10" 
        />
        <img 
          src={`/weather/${weatherIcon}.png`} 
          alt={weatherCondition} 
          className="relative z-10 w-40 h-40 object-contain" 
        />
      </div>

      <div className="text-center flex flex-col items-center z-10 -mt-6">
        <div className="flex justify-center items-baseline mb-2">
          <h1 className="text-[100px] md:text-[120px] font-weather text-[#E7E7EB] font-medium leading-none">
            {temperature}
          </h1>
          <span className="text-4xl md:text-5xl font-weather text-[#A09FB1] font-normal ml-2">
            °{unit}
          </span>
        </div>
        <p className="text-[#A09FB1] text-3xl font-weather font-semibold capitalize">
          {weatherCondition}
        </p>
      </div>

      <div className="text-center flex flex-col gap-4 mt-auto p-6 md:p-8">
        <p className="font-weather text-[#88869D] text-lg">
          Today <span className="mx-2">•</span> {formattedDate}
        </p>
        <div className="flex justify-center items-center gap-2 font-weather text-[#88869D] font-semibold">
          <img src="/location_on.svg" alt="loc icon" className="w-5 h-5" />
          <span>{cityName}</span>
        </div>
      </div>
      
    </aside>
  );
}

export default Sidebar;