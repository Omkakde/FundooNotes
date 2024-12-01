import { useEffect, useState } from "react";
import { getAllNotesApiCall } from "../../utils/Apis";
import NoteCard from "./NoteCard.jsx";
import AddNote from "../AddNote/AddNoteCard.jsx";
import "./NoteContainer.scss";
import { useOutletContext } from "react-router-dom";

function NotesContainer() {
  const [notesList, setNotesList] = useState([]);
  const { search } = useOutletContext(); 

  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getAllNotesApiCall();
    if (res?.data?.data) {
      setNotesList(res.data.data.data);
      console.log(res);
    }
  };

  const handleNotesList = (data, action) => {
    if (action === "add") {
      setNotesList((prev) => [...prev, data]);
    } else if (action === "archive" || action === "trash") {
      setNotesList((prev) => prev.filter((note) => note.id !== data.id));
    } else if (action === "edit" || action === "color") {
      const updatedList = notesList.map((note) => {
        if (note.id === data.id) {
          return data;
        }
        return note;
      });
      console.log(updatedList);
      setNotesList(updatedList);
    } else {
      console.error("Unknown action:", action);
    }
  };

  // Filter notes based on search query
  const filteredNotes = notesList.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AddNote handleNotesList={handleNotesList} />
      <div className="space-container">
        <div className="note-container">
          {filteredNotes.map((noteObj) => ( 
            <NoteCard
              key={noteObj.id}
              noteDetails={noteObj}
              handleNotesList={handleNotesList}
              container={"notes"}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default NotesContainer;
