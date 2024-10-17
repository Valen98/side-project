import { useEffect, useState } from "react";
import Snippet from "./snippet";
import Loading from "../loading/loading";
import "./style.scss"
export default function Snippets() {
  const [snippets, setSnippets] = useState([]);
  const base_URL = process.env.API_URL;

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    await fetch(`${base_URL}/snippets`)
      .then((res) => res.json())
      .then((data) => {
        setSnippets(data.data);
        console.log(data);
      });
  };

  if (!snippets) {
    return <Loading />;
  }

  return (
    <div className="snippetsMain">
      {snippets.map((s, index) => {
        return <Snippet snippet={s} key={index} />;
      })}
    </div>
  );
}
