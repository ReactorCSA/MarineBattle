import { CellContent } from './components/CellContent/CellContent';
import {ICell} from "~/interface";

interface Props {
  id: number;
  filledCells: ICell[];
  onClick: (id: number) => void;
}

export function Cell({id, filledCells, onClick}: Props) {
  const cellInList = filledCells.find((filledCell) => id === filledCell.id);

  const isFilled = cellInList !== undefined;
  const isDamaged = isFilled && cellInList.isDamaged;

  return (
    <div className="flex items-center justify-center w-12 h-12 border border-black" onClick={() => onClick(id)}>
      <CellContent isDamaged={isDamaged} isFilled={isFilled} />
    </div>
  );
}
