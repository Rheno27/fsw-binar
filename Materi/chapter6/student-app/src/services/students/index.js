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