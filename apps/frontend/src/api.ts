import { Card } from "./types";

const BASE_URL = "http://localhost:4000";

export async function fetchNodes() {
  const res = await fetch(`${BASE_URL}/api/nodes`);
  return res.json();
}

export async function fetchCards() {
  const res = await fetch(`${BASE_URL}/api/cards`);
  return res.json();
}

export async function updateCard(id: number, data: Partial<Card>) {
  const res = await fetch(`${BASE_URL}/api/cards/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "Bearer <admin_token>"  // later for admin
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function logAnalytics(eventType: string, details: any) {
  await fetch(`${BASE_URL}/api/analytics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventType, details })
  });
}
