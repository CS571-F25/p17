import Cookies from "js-cookie";

const BASE_URL = "https://cs571api.cs.wisc.edu/rest/f25/bucket";
const USERS_ENDPOINT = `${BASE_URL}/users`;
const BID = "bid_19d55e9022d59228f879c8ecd06fbe68a16d3803ab5df4ff51a0458a3d7e4efd";

export async function getAllUsers() {
  const res = await fetch(USERS_ENDPOINT, {
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
    // Convert to array and add _id to each user object
    return Object.entries(data.results).map(([id, user]) => ({
      ...user,
      _id: id
    }));
  }

  // ⭐ Fallback for raw array
  if (Array.isArray(data)) {
    return data;
  }

  return [];
}

export async function createUser(userObj) {
  const res = await fetch(USERS_ENDPOINT, {
    method: "POST",
    headers: {
      "X-CS571-ID": BID,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  });
  return res.json();
}

export async function fetchFavorites({ userId, username, setBucketList, setLoading }) {
  if (!userId && !username) {
    setBucketList?.([]);
    setLoading?.(false);
    return [];
  }
  
  try {
    setLoading?.(true);
    const res = await fetch(`${BASE_URL}/users`, {
      headers: {
        "X-CS571-ID": BID
      }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    
    const data = await res.json();
    console.log("Fetched user data:", data);
    
    // Try to find user by userId first, then by username
    let userFavorites = [];
    
    if (data?.results) {
      if (userId && data.results[userId]) {
        userFavorites = data.results[userId].favorites || [];
      } else if (username) {
        // Search by username if userId not found
        const userEntry = Object.entries(data.results).find(
          ([_, user]) => user.username === username
        );
        if (userEntry) {
          userFavorites = userEntry[1].favorites || [];
        }
      }
    }
    
    setBucketList?.(userFavorites);
    return userFavorites;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    setBucketList?.([]);
    return [];
  } finally {
    setLoading?.(false);
  }
}

export async function addToBucketList({
  destination,
  userId,
  username,
  bucketList = [],
  setBucketList
}) {
  console.log("addToBucketList called with:", { destination, userId, username, bucketListLength: bucketList.length });
  
  if ((!userId && !username) || !destination) {
    console.warn("Missing userId/username or destination");
    return bucketList;
  }
  
  const alreadyExists = bucketList.some((d) => d.id === destination.id);
  if (alreadyExists) {
    console.log("Destination already in bucket list");
    return bucketList;
  }
  
  const updatedFavorites = [...bucketList, destination];
  
  try {
    // First, fetch the current user data to get all fields including password
    const getUserRes = await fetch(`${BASE_URL}/users`, {
      headers: {
        "X-CS571-ID": BID
      }
    });
    
    if (!getUserRes.ok) {
      throw new Error(`Failed to fetch user data: ${getUserRes.status}`);
    }
    
    const userData = await getUserRes.json();
    const currentUser = userData?.results?.[userId];
    
    if (!currentUser) {
      throw new Error("User not found");
    }
    
    // Merge the updated favorites with all existing user data
    const updatedUser = {
      ...currentUser,
      favorites: updatedFavorites
    };
    
    console.log("=== API REQUEST DETAILS ===");
    console.log("URL:", `${USERS_ENDPOINT}?id=${userId}`);
    console.log("userId:", userId);
    console.log("username:", username);
    console.log("favoritesCount:", updatedFavorites.length);
    
    const res = await fetch(`${USERS_ENDPOINT}?id=${userId}`, {
      method: "PUT",
      headers: {
        "X-CS571-ID": BID,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    });
    
    console.log("API response status:", res.status);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API error response:", errorText);
      throw new Error(`Failed to add: ${res.status} - ${errorText}`);
    }
    
    const responseData = await res.json();
    console.log("API response data:", responseData);
    console.log("Successfully added to bucket list");
    setBucketList?.(updatedFavorites);
    return updatedFavorites;
  } catch (error) {
    console.error("Error adding to bucket list:", error);
    return bucketList;
  }
}

export async function removeFromBucketList({
  destinationId,
  userId,
  username,
  bucketList = [],
  setBucketList
}) {
  console.log("removeFromBucketList called with:", { destinationId, userId, username, bucketListLength: bucketList.length });
  
  if ((!userId && !username) || !destinationId) {
    console.warn("Missing userId/username or destinationId");
    return bucketList;
  }
  
  const updatedFavorites = bucketList.filter((d) => d.id !== destinationId);
  console.log("Making API call to remove from bucket list...");
  
  try {
    // First, fetch the current user data to get all fields including password
    const getUserRes = await fetch(`${BASE_URL}/users`, {
      headers: {
        "X-CS571-ID": BID
      }
    });
    
    if (!getUserRes.ok) {
      throw new Error(`Failed to fetch user data: ${getUserRes.status}`);
    }
    
    const userData = await getUserRes.json();
    const currentUser = userData?.results?.[userId];
    
    if (!currentUser) {
      throw new Error("User not found");
    }
    
    // Merge the updated favorites with all existing user data
    const updatedUser = {
      ...currentUser,
      favorites: updatedFavorites
    };
    
    const res = await fetch(`${USERS_ENDPOINT}?id=${userId}`, {
      method: "PUT",
      headers: {
        "X-CS571-ID": BID,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    });
    
    console.log("API response status:", res.status);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("API error response:", errorText);
      throw new Error(`Failed to remove: ${res.status} - ${errorText}`);
    }
    
    const responseData = await res.json();
    console.log("API response data:", responseData);
    console.log("Successfully removed from bucket list");
    setBucketList?.(updatedFavorites);
    return updatedFavorites;
  } catch (error) {
    console.error("Error removing from bucket list:", error);
    return bucketList;
  }
}