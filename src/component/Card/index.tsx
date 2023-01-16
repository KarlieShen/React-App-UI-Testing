import React, { useCallback } from "react";
import CardItem from "../CardItem";
import { useGlobalState, CardData } from "../../state";
import AddInput, { IInputInfo } from "../AddInput";
import { v4 as uuidv4 } from "uuid";
import "./index.scss";
import { useNavigate } from "react-router-dom";

export default function Cards () {
  const [cards, setCards] = useGlobalState("cards");
  const navigate = useNavigate();

  const addItem = useCallback((info: IInputInfo) => {
    const newItem = {
      id: uuidv4(),
      ...info,
    };
    setCards(old => old.concat(newItem));
    navigate(`/cards/${newItem.id}`);
  }, [navigate, setCards]);

  const deleteItem = (id: string) => {
    setCards(prev => {
      const data:CardData[] = [];
      prev.forEach((card) => {
        if (card.id !== id) {
          data.push(card);
        }
      });
      return data;
    });
  };

  return (
    <div className="card-panel">
      <p>Total:
        <b data-testid="total">{cards.length}</b>
      </p>

      <AddInput onAdd={addItem} />

      <div className="card-content">
        {
          cards.length > 0
            ? cards.map((item, index) => {
              return (
                <CardItem
                  key={ index }
                  id={item.id}
                  title={ item.title }
                  linkTitle={ item.linkTitle }
                  href={ item.link }
                  onDelete={ deleteItem }
                />
              );
            })
            : null
        }
      </div>
    </div>
  );
}
