import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchNodes, logAnalytics } from "../api";
import { Node } from "../types";

export function MapView() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selected, setSelected] = useState<Node | null>(null);

  useEffect(() => {
    fetchNodes().then(setNodes);
  }, []);

  const handleClick = async (node: Node) => {
    setSelected(node);
    await logAnalytics("nodeClick", { nodeId: node.id, title: node.title });
  };

  return (
    <div style={{ width: "100%", marginTop: "2rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem"
        }}
      >
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleClick(node)}
            style={{
              padding: "1rem",
              background: "var(--card-bg)",
              borderRadius: "1rem",
              cursor: "pointer"
            }}
          >
            <h3>{node.title}</h3>
          </motion.div>
        ))}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "#1f2937",
            borderRadius: "1rem"
          }}
        >
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          {selected.demoURL && (
            <a href={selected.demoURL} target="_blank" rel="noreferrer">
              View demo
            </a>
          )}
        </motion.div>
      )}
    </div>
  );
}
