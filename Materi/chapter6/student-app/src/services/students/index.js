export const getStudents = async (nickName) => {
    const token = localStorage.getItem('token')
    
    let params;
    if (nickName) {
        params.nick_name = nickName;
    }

    let url = 
        `${import.meta.env.VITE_API_URL}/students` +  
        new URLSearchParams(params);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    const result = await response.json()
    return result
}

export const getDetailStudent = async (id) => {
    const token = localStorage.getItem("token");

    let url = `${import.meta.env.VITE_API_URL}/students/${id}`;

    const response = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "GET",
    });

    // get data
    const result = await response.json();
    return result;
};
