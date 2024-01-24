import { getToken } from "../util/security";

function useFetch() {
  const sendRequest = async (url, method, payload) => {
    const options = { method };
    if (payload) {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(payload);
    }

    const token = getToken();
    if (token) {
      options.headers = options.headers || {};
      options.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.errorMsg ? data.errorMsg : "Something went wrong");
      }

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const getLoginDetails = async (email) => {
    try {
      const searchParams = new URLSearchParams({ email: email });
      const url = `${import.meta.env.VITE_API_URL}/user/login?${searchParams}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const notOk = await res.json();
        throw new Error(
          notOk.errorMsg ? notOk.errorMsg : "Something went wrong"
        );
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return {
    sendRequest,
    getLoginDetails,
  };
}

export default useFetch;
