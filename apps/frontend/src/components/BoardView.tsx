import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchCards, updateCard } from "../api";
import { Card, CardColumn } from "../types";
import { socket } from "../socket";

const columns: CardColumn[] = ["Upcoming", "In-Progress", "Completed"];

export function BoardView() {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    fetchCards().then(setCards);

    socket.on("card:update", (payload: any) => {
      setCards((prev) =>
        prev.map((c) =>
          c.id === payload.id
            ? { ...c, column: payload.column, position: payload.position }
            : c
        )
      );
    });

    return () => {
      socket.off("card:update");
    };
  }, []);

  const handleDragEnd = async (card: Card, newColumn: CardColumn) => {
    const updated = { ...card, column: newColumn, position: 0 };
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? updated : c))
    );

    await updateCard(card.id, { column: newColumn, position: 0 });
    socket.emit("card:moved", { id: card.id, column: newColumn, position: 0 });
  };

  return (
    <div style={{ display: "flex", gap: "1rem", width: "100%", marginTop: "2rem" }}>
      {columns.map((col) => (
        <div
          key={col}
          style={{
            flex: 1,
            background: "var(--card-bg)",
            padding: "1rem",
            borderRadius: "1rem",
            minHeight: "200px"
          }}
        >
          <h2>{col}</h2>
          {cards
            .filter((c) => c.column === col)
            .map((card) => (
              <motion.div
                key={card.id}
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                onDragEnd={() => handleDragEnd(card, col)}
                whileDrag={{ scale: 1.05 }}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.75rem",
                  background: "#1f2937",
                  borderRadius: "0.75rem",
                  cursor: "grab"
                }}
              >
                {card.title}
              </motion.div>
            ))}
        </div>
      ))}
    </div>
  );
}
