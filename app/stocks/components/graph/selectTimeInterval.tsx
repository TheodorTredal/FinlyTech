import { Button } from "@/components/ui/button";
import { TimeInterval, SelectTimeIntervalProps } from "./graphInterfaces";

// Add onClick prop to the component interface
const SelectTimeIntervalButton = ({ 
  text, 
  onClick, 
  isActive
}: { 
  text: string; 
  onClick: () => void;
  isActive?: boolean;
}) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`
        ${isActive 
          ? 'bg-gray-600 border-gray-500 text-white' 
          : 'bg-gray-800 border-gray-700 text-gray-200'
        } 
        hover:bg-gray-700 hover:text-white hover:border-gray-600 
        transition-all duration-200 font-medium px-2 py-0.3 rounded-none shadow-sm 
      `}
    >
      {text}
    </Button>
  )
}

const SelectTimeInterval: React.FC<SelectTimeIntervalProps> = ({
        currentTimeInterval, 
        setCurrentTimeInterval,
        growthPercentage,
        trendLinePercentage,
        price
    }) => {
  
  const handleClick = (input: TimeInterval) => {
    setCurrentTimeInterval(input);
  }

  return (
    <div className="flex justify-between items-center p-4 w-full">
        <div className="flex flex-col w-full text-xl font-semibold">
            <div>
                <p>{price === null ? "" : price + " $"}</p>

            </div>

            <div className="flex justify-items-start w-full">

                <p className="text-xl font-semibold">
                    {growthPercentage}
                </p>
                <p className="text-sm font-semibold text-yellow-400 px-1 py-1 ">
                    {trendLinePercentage !== null ? `( ${trendLinePercentage.toFixed(2)}% )` : ""}
                </p>

            </div>
        </div>

        <div className="flex gap-2 ml-auto">        
            <SelectTimeIntervalButton 
              onClick={() => handleClick("5d")} 
              text="5d" 
              isActive={currentTimeInterval === "5d"}
            />
            <SelectTimeIntervalButton 
              onClick={() => handleClick("1mo")} 
              text="1 mo" 
              isActive={currentTimeInterval === "1mo"}
            />
            <SelectTimeIntervalButton 
              onClick={() => handleClick("6mo")} 
              text="6 mo" 
              isActive={currentTimeInterval === "6mo"}
            />
            <SelectTimeIntervalButton 
              onClick={() => handleClick("1y")} 
              text="1 yr" 
              isActive={currentTimeInterval === "1y"}
            />
            <SelectTimeIntervalButton 
              onClick={() => handleClick("ytd")} 
              text="ytd" 
              isActive={currentTimeInterval === "ytd"}
            />
            <SelectTimeIntervalButton 
              onClick={() => handleClick("3y")} 
              text="3 yr" 
              isActive={currentTimeInterval === "3y"}
            />
            <SelectTimeIntervalButton 
              onClick={() => handleClick("5y")} 
              text="5 yr" 
              isActive={currentTimeInterval === "5y"}
            />
            <SelectTimeIntervalButton 
              onClick={() => handleClick("10y")} 
              text="10 yr" 
              isActive={currentTimeInterval === "10y"}
            />
            <SelectTimeIntervalButton 
              onClick={() => handleClick("all")} 
              text="all" 
              isActive={currentTimeInterval === "all"}
            />
      </div>
    </div>
  )
}

export default SelectTimeInterval;