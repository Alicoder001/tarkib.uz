import { baseUrl } from "@/constants";
export async function registerUser(data) {
  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const resBody = await res.json();
    if (!res.ok) {
      throw resBody;
    } else return resBody;
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
    const resBody = await res.json();
    if (!res.ok) {
      throw resBody;
    } else return resBody;
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
    const resBody = await res.json();
    if (!res.ok) {
      throw resBody;
    } else return resBody;
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
    const resBody = await res.json();
    if (!res.ok) {
      throw resBody;
    } else return resBody;
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
    const resBody = await res.json();
    if (!res.ok) {
      throw resBody;
    } else return resBody;
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
    const resBody = await res.json();
    if (!res.ok) {
      throw resBody;
    } else return resBody;
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
    const resBody = await res.json();
    if (!res.ok) {
      throw resBody;
    } else return resBody;
  } catch ({ message }) {
    return message;
  }
}

export async function forgotPassword(data) {
  try {
    const res = await fetch(`${baseUrl}/auth/forgot`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const resBody = await res.json();
    if (!res.ok) {
      throw new Error(resBody.message);
    } else {
      return resBody;
    }
  } catch (error) {
    return error;
  }
}
