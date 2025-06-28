import Card from "../components/Card";
import { expenses } from "../helpers/expenses";
import CardContainer from "../components/CardContainer";

const Home = () => {
  return (
    <div className="w-full flex-col justify-center items-center">
      <h1>Home</h1>
      <p>Nothing like home</p>
      <div className="w-full flex justify-center">
        <CardContainer />
      </div>
    </div>
  );
};

export default Home;
