import React, { useCallback, useEffect, useState } from "react";
import "./index.scss";

interface ICardProps {
  title: string;
  text: string;
  linkTitle: string;
  target: string;
  href: string;
  onClick: (url: string) => void;
  linkClassName: string;
}

function Card(props: ICardProps) {
  const { title, text, target, linkTitle, href, onClick, linkClassName } = props;
  return (
    <div className="card">
      <div className="card-title">{ title }</div>
      <div className="card-text">{ text }</div>
      <a className={`default-link card-link ${ linkClassName }`}
        target={ target }
        href={ href }
        onClick={ () => onClick(href) }
      >
        { linkTitle }
      </a>
    </div>
  );
}

interface PostData {
  id: string;
  title: {
    en: string;
    id: string;
  };
  body: null | {
    en: string;
    id: string;
  };
  link_title: string;
  link: string;
}
interface CardData {
  id: string;
  title: string;
  link_title: string;
  link: string;
  text: string;
}

async function api<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export default function Cards () {
  const [cards, setCards] = useState<CardData[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const data = await api<PostData[]>("https://my-json-server.typicode.com/savayer/demo/posts");
      const newData = data.map((item) => ({
        id: item.id,
        title: item.title.en,
        link_title: item.link_title,
        link: item.link,
        text: (item.body?.en.substr(0, 50) || "") + "...",
      }));
      setCards(newData);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const loadMore = () => {
    setCards(old => old.concat(old));
  };

  const deleteTwo = () => {
    setCards(old => old.slice(2));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const analyticsTrackClick = (url: string) => {
    console.log(url);
  };

  return (
    <div className="card-panel">
      <button onClick={loadMore}>add double</button>
      <button onClick={deleteTwo}>delete two</button>
      <p>Total:
        <b data-testid="total">{cards.length}</b>
      </p>

      <div className="card-content">
        {
          cards.length > 0
            ? cards.map((item, index) => {
              return (
                <Card
                  key={ index }
                  title={ item.title }
                  linkTitle={ item.link_title }
                  href={ item.link }
                  text={ item.text }
                  linkClassName={ item.id === "1" ? "card-link--red" : "" }
                  target={ item.id === "1" ? "_blank" : "" }
                  onClick={ analyticsTrackClick }
                />
              );
            })
            : null
        }
      </div>
    </div>
  );
}
