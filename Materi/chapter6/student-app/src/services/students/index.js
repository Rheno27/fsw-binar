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

export const createStudent = async (data) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('nick_name', data.nickName);
    formData.append('university_id', data.universityId);
    formData.append('class_id', data.classId);
    if (data.profilePicture) {
        formData.append('profile_picture', data.profilePicture);
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/students`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
    });

    const result = await response.json();
    return result;
}

export const updateStudent = async (id, data) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('nick_name', data.nickName);
    formData.append('university_id', data.universityId);
    formData.append('class_id', data.classId);
    if (data.profilePicture) {
        formData.append('profile_picture', data.profilePicture);
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/students/${id}`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const result = await response.json();
    return result;
}

export const deleteStudent = async (id) => {
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/students/${id}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    const result = await response.json();
    return result;
}
