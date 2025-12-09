import Cookies from "js-cookie";

const BASE = "https://cs571api.cs.wisc.edu/rest/f25/bucket/users";
const BID = "bid_19d55e9022d59228f879c8ecd06fbe68a16d3803ab5df4ff51a0458a3d7e4efd";

// export async function getAllUsers() {
//   const res = await fetch(BASE, {
//     headers: {
//       "X-CS571-ID": BID
//     }
//   });
//   return res.json();
// }

// export async function getAllUsers() {
//   const res = await fetch(BASE, {
//     headers: {
//       "X-CS571-ID": BID
//     }
//   });

//   // If this is the first time, bucket returns 404
//   if (res.status === 404) {
//     return [];  // collection doesn't exist yet
//   }

//   return res.json();
// }

export async function getAllUsers() {
  const res = await fetch(BASE, {
    headers: {
      "X-CS571-ID": BID
    }
  });

  if (res.status === 404) {
    return [];
  }

  const data = await res.json();
  console.log("RAW API RESPONSE:", data);

  // ⭐ If bucket returns { results: { id1: {...}, id2: {...} } }
  if (data && data.results && typeof data.results === "object") {
    return Object.values(data.results);
  }

  // ⭐ Fallback for raw array
  if (Array.isArray(data)) {
    return data;
  }

  return [];
}


export async function createUser(userObj) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "X-CS571-ID": BID,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  });
  return res.json();
}
