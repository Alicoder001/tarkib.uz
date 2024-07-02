import { baseUrl } from "@/constants";

export async function registerUser(data) {
  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status !== 200 || 201) {
      throw new Error(res);
    } else return res;
  } catch ({ status }) {
    return status;
  }
}

export async function updateUser(data) {
  try {
    const res = await fetch(`${baseUrl}/user/update`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status !== 200 || 201) {
      throw new Error(res);
    } else return res;
  } catch ({ status }) {
    return status;
  }
}

export async function deleteUser(token) {
  try {
    const res = await fetch(`${baseUrl}/user/delete`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (res.status !== 200 || 201) {
      throw new Error(res);
    } else return res;
  } catch ({ status }) {
    return status;
  }
}

export async function verifyOTP(data) {
  try {
    const res = await fetch(`${baseUrl}/auth/verify`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status !== 200 || 201) {
      throw new Error(res);
    } else return res;
  } catch ({ status }) {
    return status;
  }
}

export async function uploadFile(file) {
  const image = new FormData();
  image.append("image", file);
  try {
    const res = await fetch(`${baseUrl}/file/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: image,
    });
    if (res.status !== 200 || 201) {
      throw new Error(res);
    } else return res;
  } catch ({ status }) {
    return status;
  }
}
