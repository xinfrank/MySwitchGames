import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { GameListHeader } from "../components/GameListHeader";
import { GameForm } from "../components/GameForm";
import { GameCard } from "../components/GameCard";
import { Donut } from "../components/Donut";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const Home = () => {
  const [games, setGames] = useState([]);
  const [amount, setAmount] = useState(0);
  const [hours, setHours] = useState(0);
  const [formToggle, setFormToggle] = useState(false);
  const [documentID, setDocumentID] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    console.log("LOGGING GAMES");
    const q = query(
      collection(db, "game_list"),
      where("user_id", "==", `${id}`)
    );
    const unsub = onSnapshot(q, (qSnapshot) => {
      const game_list = [];
      const doc_id = [];
      qSnapshot.forEach((doc) => {
        game_list.push(doc.data());
        doc_id.push(doc.id);
        console.log("INSIDE SNAP");
      });
      setDocumentID(doc_id[0]);
      setAmount(game_list[0].game_objs.length);
      let game_hours = 0;
      game_list[0].game_objs.forEach(
        (game) => (game_hours += parseInt(game.hours))
      );
      setHours(game_hours);
      setGames(game_list[0].game_objs);
    });
    return () => unsub();
  }, [id]);
  return (
    <div className="w-4/5 xs:w-9/12 md:w-4/5 max-w-7xl m-auto">
      <Navbar />
      <GameListHeader
        amount={amount}
        hours={hours}
        setFormToggle={setFormToggle}
        id={id}
      />
      <div className="custom-grid">
        {games.map((game) => {
          return (
            <GameCard
              key={uuidv4()}
              {...game}
              existingGames={games}
              setGames={setGames}
              documentID={documentID}
            ></GameCard>
          );
        })}
      </div>
      <h1 className="text-neutral-50 text-center text-3xl mb-5 mt-5 font-bold">
        Games by Genre
      </h1>
      <div className="w-4/5 xs:w-9/12 md:w-4/5 max-w-7xl m-auto flex justify-center pb-5">
        <Donut games={games} />
      </div>
      {formToggle && (
        <div
          className="bg-neutral-900 opacity-80 h-screen w-screen fixed top-0 left-0 cursor-pointer"
          onClick={() => setFormToggle(false)}
        ></div>
      )}
      {formToggle && (
        <GameForm
          existingGames={games}
          documentID={documentID}
          setGames={setGames}
          setFormToggle={setFormToggle}
        />
      )}
    </div>
  );
};
