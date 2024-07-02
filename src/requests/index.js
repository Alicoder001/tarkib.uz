import { baseUrl } from "@/constants";

export async function registerUser(data) {
  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status !== 200) {
      throw new Error(res);
    } else return res.json();
  } catch ({ message }) {
    return message;
  }
}

export async function loginUser(data) {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status !== 200) {
      throw new Error(res);
    } else return res.json();
  } catch ({ message }) {
    return message;
  }
}

export async function logoutUser(token) {
  try {
    const res = await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.json();
    } else throw new Error(res);
  } catch ({ message }) {
    return message;
  }
}

export async function updateUser(data) {
  try {
    const res = await fetch(`${baseUrl}/user/update`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status !== 200) {
      throw new Error(res);
    } else return res.json();
  } catch ({ message }) {
    return message;
  }
}

export async function deleteUser(token) {
  try {
    const res = await fetch(`${baseUrl}/user/delete`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (res.status !== 200) {
      throw new Error(res);
    } else return res.json();
  } catch ({ message }) {
    return message;
  }
}

export async function verifyOTP(data) {
  try {
    const res = await fetch(`${baseUrl}/auth/verify`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status !== 200) {
      throw new Error(res);
    } else return res.json();
  } catch ({ message }) {
    return message;
  }
}

export async function uploadFile(file) {
  const image = new FormData();
  image.append("file", file);
  image.append("type", "avatars");
  try {
    const res = await fetch(`${baseUrl}/file/upload`, {
      method: "POST",
      body: image,
    });
    if (res.status !== 200) {
      throw new Error(res);
    } else return res.json();
  } catch ({ message }) {
    return message;
  }
}
