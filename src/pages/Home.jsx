import { Navbar } from "../components/Navbar";
import { GameList } from "../components/GameList";
import { GameForm } from "../components/GameForm";
export const Home = () => {
  return (
    <div className="w-4/5 xs:w-9/12 md:w-4/5 max-w-7xl m-auto">
      <Navbar />
      <GameList className="flex" />
      <GameForm />
    </div>
  );
};
