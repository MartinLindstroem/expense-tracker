import Card from "./Card";
import months from "../helpers/months";

const CardContainer = () => {
  return (
    <div className="flex flex-wrap w-2/3 gap-4 mt-20 justify-center">
      {months.map((month, index) => (
        <div key={index} className="w-1/7 flex justify-center">
          <Card month={month} />
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
