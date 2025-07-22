import CardContainer from "../components/CardContainer";
import { useExpenseStore } from "../store";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const Expenses = () => {
  const { selectedYear } = useExpenseStore();

  return (
    <div className="w-full flex-col justify-center items-center">
      <div className="flex items-center justify-center gap-4">
        <CaretLeft size={32} />
        <h1 className="text-5xl font-bold">{selectedYear}</h1>
        <CaretRight size={32} />
      </div>

      <div className="w-full flex justify-center">
        <CardContainer />
      </div>
    </div>
  );
};

export default Expenses;
