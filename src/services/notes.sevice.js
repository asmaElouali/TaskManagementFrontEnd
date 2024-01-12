import httpClient from "../api/http-common";

export const readAll= () =>{
       return httpClient.get("/Managment/notee");
}

export const saveNote =(note) => {
        return httpClient.post("/Managment/notee",note);
}
export const saveNoteId =(id,note) => {
       return httpClient.post(`/Managment/notes/${id}`,note);
}

export const readOne=(id)=>{
       return httpClient.get(`/Managment/notee/${id}`);
}

export const readOneNom=(id)=>{
       return httpClient.get(`SERVICE-NOTE/Managment/client/${id}`)
}

export const deleteOne=(id)=>{
       return httpClient.delete(`/Managment/notee/${id}`);
}
 
export const updateOne=(note)=> {
      return httpClient.put('/Managment/notee',note);
}