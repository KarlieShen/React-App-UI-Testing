import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

interface ICardProps {
  id: string;
  title: string;
  linkTitle: string;
  href: string;
  onDelete: (id: string) => void;
}

export default function CardItem(props: ICardProps) {
  const { id, title, linkTitle, href, onDelete } = props;
  const navigate = useNavigate();
  return (
    <div className="card"
      onClick={() => {
        navigate(`/cards/${id}`);
      }}>
      <div>
        <p className="card-title">{ title }</p>
        <a
          className="card-link"
          target="_blank"
          rel="noreferrer"
          href={ href }
        >
          { linkTitle }
        </a>
      </div>
      <button
        className="card-del-btn"
        onClick={(e) => {
          onDelete(id);
          e.stopPropagation();
        }}
      >delete</button>
    </div>
  );
}