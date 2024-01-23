// const BASE_URL = "mongodb+srv://cedric:rxSWq1wvUK0heSpZ@cluster0.03lglb6.mongodb.net/restaurantbooking?retryWrites=true&w=majority"

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