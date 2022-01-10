import { useState } from "react";
import { AutoSearchBar } from "./AutoSearchBar";

export const GameForm = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Completed");
  const [formHours, setFormHours] = useState("");
  const [replayability, setReplayability] = useState("High");
  const [rating, setRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside handlesumbit");
    setTitle("");
    setStatus("Completed");
    setFormHours("");
    setReplayability("High");
    setRating("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background-1000 h-auto max-w-xl rounded-lg overflow-scroll flex flex-col px-8 py-8 text-neutral-50 justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-fit"
    >
      <div>
        <AutoSearchBar title={title} setTitle={setTitle} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-0.5 font-semibold">Status</label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-sm bg-background-950 mb-3 px-2 py-1  w-full"
            >
              <option value="Completed">Completed</option>
              <option value="Playing">Playing</option>
              <option value="On-Hold">On-Hold</option>
              <option value="Dropped">Dropped</option>
            </select>
            <label className="block mb-0.5 font-semibold">Hours</label>
            <input
              type="text"
              required
              pattern="^[0-9]{0,6}$"
              value={formHours}
              placeholder="In-game hours"
              className="rounded-sm bg-background-950 mb-3 px-2 py-1 w-full focus:outline-none "
              onChange={(e) => setFormHours(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-0.5 font-semibold">Replayability</label>
            <select
              onChange={(e) => setReplayability(e.target.value)}
              className="rounded-sm bg-background-950 mb-3 px-2 py-1  w-full"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <label className="block mb-0.5 font-semibold">Rating</label>
            <input
              type="text"
              required
              pattern="^\d{0,1}(?:\.\d)?$"
              value={rating}
              placeholder="Score out of 10"
              className="rounded-sm bg-background-950 mb-3 px-2 py-1 w-full focus:outline-none "
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button className="bg-buttonbg-900 bg-10 px-8 h-12 font-medium rounded-md flex justify-center items-center mt-5">
        Add Game
      </button>
    </form>
  );
};
