function HighlightCard({ title, value, unit, children }) {
  return (
 
 <div className="bg-[#1E213A] p-6 py-6 lg:py-4 flex flex-col items-center justify-center font-weather shadow-md">
      <h3 className="text-[#E7E7EB] text-md font-medium mb-1 lg:mb-2">
        {title}
      </h3>
      
      <p className="text-6xl font-bold text-white mb-2 lg:mb-1">
        {value} <span className="text-4xl font-normal">{unit}</span>
      </p>
      
      <div className="w-full flex justify-center mt-2 lg:mt-0">
        {children}
      </div>
    </div>
  );
}

export default HighlightCard;