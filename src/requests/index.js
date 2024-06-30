import { baseUrl } from "@/constants";

export async function registerUser(data) {
  try {
    const res = await fetch(`${baseUrl}/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status !== 200) {
      throw new Error(res);
    } else return res;
  } catch ({ status }) {
    return status;
  }
}

export async function verifyOTP(data) {
  try {
    const res = await fetch(`${baseUrl}/v1/auth/verify`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status !== 200) {
      throw new Error(res);
    } else return res;
  } catch ({ status }) {
    return status;
  }
}
