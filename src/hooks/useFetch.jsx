function useFetch() {
  const sendRequest = async (url, method, payload) => {
    const options = { method };
    if (payload) {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(payload);
    }

    // TODO
    // const token = getToken();
    // if (token) {
    //   options.headers = options.headers || {};
    //   options.headers.Authorization = `Bearer ${token}`;
    // }

    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return {
    sendRequest,
  };
}

export default useFetch;
