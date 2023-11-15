import Error from "../react-complete-guide-course-resources-main/attachments/15 HTTP Requests/Error.jsx";

export async function fetchAvailablePlaces() {
    const response = await fetch("http://localhost:3000/places")
    const resData = await response.json()

    if (!response.ok) {  // not 400, 500
        const error = new Error("Failed to fetch places")
        throw error
    }

    return resData.places

}

export async function updateUserPlaces(places) {
    const response = await fetch("http://localhost:3000/user-places", {
        method: "PUT",
        body: JSON.stringify({places}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const resData = await response.json()
    if (!response.ok) {
        throw new Error("Failed to fetch places")
    }

    return resData.message

}


export async function fetchUserPlaces() {
    const response = await fetch("http://localhost:3000/user-places")
    const resData = await response.json()

    if (!response.ok) {  // not 400, 500
        const error = new Error("Failed to fetch user places")
        throw error
    }

    return resData.places

}
