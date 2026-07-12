function ForecastCard({ date, iconCode, max, min, unit }) {
  let displayMax = max;
  let displayMin = min;

  if (unit === 'F') {
    displayMax = Math.round((max * 1.8) + 32);
    displayMin = Math.round((min * 1.8) + 32);
  }

  return (
    <div className="bg-[#1E213A] p-3 py-4 w-30 md:p-4 md:py-8 flex flex-col items-center justify-between font-weather shadow-md">
      
      <p className="text-[#E7E7EB] text-sm md:text-lg mb-2 md:mb-4 text-center whitespace-nowrap">
        {date}
      </p>
      
      <img 
        src={`/weather/${iconCode}.png`} 
        alt="Weather icon" 
        className="w-12 h-12 md:w-16 md:h-16 object-contain mb-4 md:mb-8" 
      />
      
      <div className="flex gap-2 md:gap-4 w-full justify-center text-sm md:text-lg">
        <span className="text-[#E7E7EB] font-medium">{displayMax}°{unit}</span>
        <span className="text-[#A09FB1] font-medium">{displayMin}°{unit}</span>
      </div>

    </div>
  );
}

export default ForecastCard;