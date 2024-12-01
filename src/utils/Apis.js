import axios from "axios";

const BASE_URL = "https://fundoonotes.incubation.bridgelabz.com/api";


export const loginApiCall = (email, password) => {
  return axios
    .post("https://fundoonotes.incubation.bridgelabz.com/api/user/login", {
      email: email,
      password: password,
    })

    .then((res) => {
      console.log("API Response:", res.data);     
      const accessToken = res?.data?.id || res?.data?.tokens?.access;
     
      
      const username = res?.data?.firstName; 
      const userEmail = res?.data?.email;
     
      console.log(username,userEmail);
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        
        localStorage.setItem("username", username);
        localStorage.setItem("userEmail", userEmail);
      }

      return res; 
    });
};


export const SignUpApiCall = async (payload, END_POINT) => {
  console.log(payload);
  console.log(END_POINT);
  return await axios.post(`${BASE_URL}${END_POINT}`, payload);
};

export const getAllNotesApiCall = () => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.get(`${BASE_URL}/notes/getNotesList`, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });
};

export const archiveTrashApiCall = (endpoint, payload) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.post(`${BASE_URL}${endpoint}`, payload, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });
};

export const deleteNotesApiCall = (endpoint, payload) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.post(`${BASE_URL}${endpoint}`, payload, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });
};

/*   add this same object in post method    {
    headers: {
      Authorization: `${accessToken}`,
    },*/

export const getArchiveTrashNotesList = (END_POINT) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.get(`${BASE_URL}${END_POINT}`, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });
};

export const addNoteApi = (payload) => {
  return axios.post(
    `https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    }
  );
};

// Update a note
export const updateNotesApiCall = async (payload) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.post(
    `https://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes
`,
    payload,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  console.log("Note updated successfully:", response.data);
  return response.data;
};


export const colorNotesApiCall= async(END_POINT,Payload)=>{
  const token = localStorage.getItem("accessToken");
  return await axios.post(`${BASE_URL}${END_POINT}`,
   Payload,
   {
      headers:{
       Authorization:`${token}`,
      },
   }
 )
}
