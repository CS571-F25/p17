import Cookies from "js-cookie";

const BASE = "https://cs571api.cs.wisc.edu/rest/f25/bucket/posts";
const BID = "bid_19d55e9022d59228f879c8ecd06fbe68a16d3803ab5df4ff51a0458a3d7e4efd";

export async function getAllPosts() {
  const res = await fetch(BASE, {
    headers: {
      "X-CS571-ID": BID
    }
  });

  if (res.status === 404) return [];

  const data = await res.json();

  if (data && data.results && typeof data.results === "object") {
    return Object.values(data.results);
  }

  if (Array.isArray(data)) return data;
  return [];
}

export async function createPost(postObj) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "X-CS571-ID": BID,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj)
  });

  return res.json();
}
