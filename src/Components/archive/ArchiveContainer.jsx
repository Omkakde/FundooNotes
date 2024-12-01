

import React, { useEffect, useState } from "react";
import { getArchiveTrashNotesList } from "../../utils/Apis"; 
import "./ArchiveContainer.scss";
import NoteCard from "../NoteCard/NoteCard.jsx";
import { useOutletContext } from "react-router-dom";
import emptyTrashImg from "../../assets/images/NoData.png";
export default function ArchiveContainer() {
  const [archiveList, setArchiveList] = useState([]);
  const { search } = useOutletContext(); 

  useEffect(() => {
    fetchArchiveNotes();
  }, []);

  const fetchArchiveNotes = async () => {
    const res = await getArchiveTrashNotesList("/notes/getArchiveNotesList");
    if (res?.data?.data) {
      setArchiveList(res.data.data.data); 
    } else {
      console.error("No data found in response.");
    }
  };

  const handleArchiveList = (data, action) => {
    if (action === "unArchive") {
      let updatedList = archiveList.filter((ele, index) => ele.id !== data.id);
      setArchiveList(updatedList);
    }
    if (action === "archive") {
      let updatedList = archiveList.filter((ele, index) => ele.id !== data.id);
      setArchiveList(updatedList);
    }
    if (action === "trash") {
      let updatedList = archiveList.filter((ele, index) => ele.id !== data.id);
      setArchiveList(updatedList);
    }
  };
  
   // Filter notes based on search query
   const filteredNotes = archiveList.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="note-container">
        {filteredNotes.length === 0 ? (
          <div className="empty-trash-container">
            <img
              id="imgNoData"
              src={emptyTrashImg}
              alt="No Trash"
              className="empty-trash-img"
            />
          </div>
        ) : (
          filteredNotes.map((archiveObj) => (
            <NoteCard
              key={archiveObj.id}
              noteDetails={archiveObj}
              handleNotesList={handleArchiveList}
              container={"archive"}
            />
          ))
        )}
      </div>
    </div>
  );
  
}



