import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../state";
import "./index.scss";

const SingleCard = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [cards] = useGlobalState("cards");
  const data = cards.find(card => card.id === cardId);

  return (
    <div className="single-card-page">
      <div>
        Title: <b>{data?.title}</b>
      </div>
      <div>
        Link: <b>{data?.link}</b>
      </div>
      <div>
        LinkTitle: <b>{data?.linkTitle}</b>
      </div>
      <button onClick={() => navigate(-1)}>back to cards list</button>
    </div>
  );
};

export default SingleCard;