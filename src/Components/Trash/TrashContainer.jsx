import React, { useEffect, useState } from "react";
import { getArchiveTrashNotesList } from "../../utils/Apis";
import "./TrashContainer.scss";
import NoteCard from "../NoteCard/NoteCard.jsx";
import emptyTrashImg from "../../assets/images/NoData.png";
import { useOutletContext } from "react-router-dom";
export default function TrashContainer() {
  const [trashList, setTrashList] = useState([]);
  const { search } = useOutletContext(); 

  useEffect(() => {
    fetchTrashNotes();
  }, []);

  const fetchTrashNotes = async () => {
    const res = await getArchiveTrashNotesList("/notes/getTrashNotesList");
    if (res?.data?.data) {
      setTrashList(res.data.data.data);
    } else {
      console.error("No data found in response.");
    }
  };

  const handleTrashList = (data, action) => {
    if (action === "delete_forever") {
      let updatedList = trashList.filter((ele) => ele.id !== data.id);
      setTrashList(updatedList);
    }
    if (action === "recover") {
      let updatedList = trashList.filter((ele) => ele.id !== data.id);
      setTrashList(updatedList);
    }
  };
  
    
    const filteredNotes = trashList.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.description.toLowerCase().includes(search.toLowerCase())
    );
  

  return (
    <div className="main-container">
      <div className="note-container">
        {filteredNotes.length === 0 ? (
          <div className="empty-trash-container">
            <img id="imgNoData"
              src={emptyTrashImg}
              alt="No Trash"
              className="empty-trash-img"
            />
            
          </div>
        ) : (
          filteredNotes.map((trashObj) => (
            <NoteCard
              key={trashObj.id}
              noteDetails={trashObj}
              handleNotesList={handleTrashList}
              container={"trash"}
            />
          ))
        )}
      </div>
    </div>
  );
}
