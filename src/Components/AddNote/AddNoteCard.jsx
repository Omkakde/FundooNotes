import "./AddNoteCard.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BrushIcon from "@mui/icons-material/Brush";
import ImageIcon from "@mui/icons-material/Image";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaletteIcon from "@mui/icons-material/Palette";
import ArchiveIcon from "@mui/icons-material/Archive";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React, { useState } from "react";
import { addNoteApi, colorNotesApiCall, updateNotesApiCall ,archiveTrashApiCall} from "../../utils/Apis";



const AddNoteCard = ({ mode = "add", noteDetails = {}, handleNotesList }) => {
  const [isExpanded, setIsExpanded] = useState(mode === "add" ? false : true);
  const [title, setTitle] = useState(mode === "add" ? "" : noteDetails.title || "");
  const [description, setDescription] = useState(mode === "add" ? "" : noteDetails.description || "");
  const [color, setColor] = useState(noteDetails.color || ""); 
  const [openColor, setOpenColorMenu] = useState(false); 

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleNoteIconClick = (action) => {
    if (action === "archive") {
      const payload = {
        noteId: noteDetails.id,
      };
      payload.isArchived = true;
      archiveTrashApiCall("/notes/archiveNotes", payload);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);

    if (mode === "add") {
      handleAddNote();
    } else if (mode === "edit") {
      const payload = {
        noteId: noteDetails.id,
        title: title,
        description: description,
        color: color, 
      };

      updateNotesApiCall(payload)
        .then((data) => {
          console.log("Updated note data:", data);

          handleNotesList(
            { ...noteDetails, title, description, color },
            "edit"
          );
        })
        .catch((error) => {
          console.error("Error updating note:", error);
        });
    }

   
    setColor(noteDetails.color || ""); 
    setTitle("");
    setDescription("");
  };

  const handleAddNote = async () => {
    if (title && description) { 
      const payload = { title, description, color };

      const response = await addNoteApi(payload);
      if (response) {
        handleNotesList(
          {
            id: response.id,
            title: title,
            description: description,
            color: color,
            quantity: response.quantity,
          },
          "add"
        );
        toast("Note added successfully!", {
          style: { backgroundColor: "#31ff11", color: "black" },
        });
        
        console.log("Note added successfully:", response);
      } else {
        console.log("Title and description are required.");
      }
    }
  };

  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor); 
    const payload = {
      noteIdList: [noteDetails.id],
      color: selectedColor,
    };

    colorNotesApiCall("/notes/changesColorNotes", payload)
      .then(() => {
        handleNotesList({ ...noteDetails, color: selectedColor }, "color"); 
      })
      .catch((error) => console.error("Error updating color:", error));

    setOpenColorMenu(false);
  };

  const handleColorMenuClick = () => {
    setOpenColorMenu(!openColor);
  };

  return (
    <>
      {!isExpanded ? (
        <div className="collapsed-note" onClick={handleInputClick}>
          <input
            type="text"
            placeholder="Take a note..."
            className="collapsed-input"
            value=""
            readOnly
          />
          <div className="collapsed-icons">
            <CheckBoxIcon className="icon" />
            <BrushIcon className="icon" />
            <ImageIcon className="icon" />
          </div>
        </div>
      ) : (
        <div
          className="expanded-note"
          style={{ backgroundColor: color || noteDetails?.color || "#ffffff" }}
        >
          <input
            type="text"
            placeholder="Title"
            className="note-title"
            value={title}
            style={{ backgroundColor: color || noteDetails?.color || "#ffffff" }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Take a note..."
            style={{ backgroundColor: color || noteDetails?.color || "#ffffff" }}
            className="note-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="note-footer">
            <div className="icons">
              <NotificationsNoneIcon className="icon" />
              <PersonAddIcon className="icon" />
              <PaletteIcon className="icon" onClick={handleColorMenuClick} />
              <ImageIcon className="icon" />
              <ArchiveIcon className="icon" onClick={() => handleNoteIconClick("archive")} />
              <MoreVertIcon className="icon" />
              <UndoIcon className="icon" />
              <RedoIcon className="icon" />
            </div>
            <button className="close-btn" onClick={handleClose}>
              Close
            </button>
          </div>

          {openColor && (
            <div className="color-menu">
              <div className="color-row">
                {["#FFEB3B", "#FF7043", "#66BB6A", "#29B6F6", "#AB47BC", "#FF4081"].map(
                  (color) => (
                    <div
                      key={color}
                      className="color-option"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                    />
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default AddNoteCard;
