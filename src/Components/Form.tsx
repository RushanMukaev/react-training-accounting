import Note, { NoteData } from "./Note";

import { useState } from "react";

function Form() {
  const [dateField, setDateField] = useState<string>("");
  const [distanceField, setDistanceField] = useState<string>("");
  const [notes, setNotes] = useState<NoteData[]>([]);

  function inputDateHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    setDateField(value);

    if (value.length === 11) {
      const datePattern =/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;
      if (!datePattern.test(value)) {
        alert("Введите дату в формате ДД.ММ.ГГГГ");
        setDateField("");
      }
    }
  }

  function inputDistanceHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    setDistanceField(event.target.value);

    if (event.target.value.length === 2) {
      if (/^(\d{2})$/.test(event.target.value)) {
        setDistanceField(event.target.value);
      } else {
        alert("Введите дистанцию в КМ");
        setDistanceField("");
        return;
      }
    }
  }

  function okBtnHandler(event: React.MouseEvent<HTMLButtonElement>): void {
    console.log("okBtnHandler вызван");
    event.preventDefault();
    if (dateField.length < 10) {
      alert("Введите дату в формате ДД.ММ.ГГГГ");
      return;
    } else if (!dateField || !distanceField) {
      alert("Введите данные");
      return;
    }

    setNotes((previousArr: NoteData[]) => {
      const existDateIndex = previousArr.findIndex(
        (note) => note.date === dateField
      );
      if (existDateIndex !== -1) {
        //////////console.log("setNotes вызван в обновленном массиве");
        const updatedNotes = [...previousArr];
        updatedNotes[existDateIndex].distance =
          Number(updatedNotes[existDateIndex].distance) + Number(distanceField);
        return updatedNotes;
      } else {
        ///////////////////console.log("setNotes вызван в новом массиве");
        const newNotes = [
          ...previousArr,
          { date: dateField, distance: +distanceField },
        ];
        return newNotes.sort((a, b) => {
          const dateA = new Date(a.date.split(".").reverse().join("-"));
          const dateB = new Date(b.date.split(".").reverse().join("-"));
          return dateB.getTime() - dateA.getTime();
        });
      }
    });
    setDateField("");
    setDistanceField("");
  }

  function deleteNoteHandler(index: number): void {
    setNotes((previousArr) => previousArr.filter((_, i) => i !== index));
  }

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <form className="form">
          <div className="formGroup">
            <label htmlFor="dateInput">{"Дата (ДД.ММ.ГГГГ.)"}</label>
            <input
              id="dateInput"
              onChange={inputDateHandler}
              value={dateField}
              className="field"
              type="text"
              placeholder="Введите дату"
            />
          </div>
          <div className="formGroup">
            <label htmlFor="distanceInput">{"Пройдено км."}</label>
            <input
              id="distanceInput"
              onChange={inputDistanceHandler}
              value={distanceField}
              className="field"
              type="text"
              placeholder="Введите дистанцию"
            />
          </div>
          <button className="btn" type="button" onClick={okBtnHandler}>
            {"OK"}
          </button>
        </form>
      </div>
      <div className="titleContainer">
        <span>{"Дата (ДД.ММ.ГГГГ.)"}</span>
        <span>{"Пройдено км."}</span>
        <span>{"Действия"}</span>
      </div>
      <div className="notesContainer">
        {notes.map((note, index) => (
          <Note
            key={index}
            date={note.date}
            distance={note.distance}
            onRemove={() => deleteNoteHandler(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Form;
