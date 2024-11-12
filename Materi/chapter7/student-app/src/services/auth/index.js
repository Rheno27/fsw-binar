export const login = async (body) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
});

const result = await response.json();

    return result;
}

export const register = async (request) => {
    const formData = new FormData()
    formData.append('name', request.name)
    formData.append('email', request.email)
    formData.append('password', request.password)
    formData.append('profile_picture', request.profilePicture)

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`, 
        {
            body: formData,
            method: 'POST',
        }
    )

    const result = await response.json()
    return result
}

export const profile = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET"
        }
    )

    const result = await response.json()
    return result
}
