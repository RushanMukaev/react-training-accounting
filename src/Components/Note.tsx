export interface NoteData {
  date: string;
  distance: string | number;
}

interface NoteProps extends NoteData {
  onRemove: () => void;
}

export default function Note({ date, distance, onRemove }: NoteProps) {
  function removeHandler(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    onRemove();
  }

  return (
    <div className="note">
      <span>{date}</span>
      <span>{distance}</span>
      <button className="removeBtn" onClick={removeHandler}>
        ✘
      </button>
    </div>
  );
}
