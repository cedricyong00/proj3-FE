// const BASE_URL = ""

// export async function signUp(userData) {
//     const createURL = BASE_URL + '/create';
//     console.log(createURL);
//     const res = await fetch(createURL, {
//         method: 'POST',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(userData),
//     });

//     if (res.ok) {
//         console.log(res);
//         return res.json();
//     } else {
//         throw new Error("Invalid Sign Up");
//     }
// }