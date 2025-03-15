import {useCallback, useMemo} from "react";
import {ICell, ICellState} from "~/interface";
import { CellContent } from '../CellContent/CellContent';

interface Props {
  id: number;
  filledCells: ICell[];
  onClick: (cell: ICell | undefined) => void;
}

export function Cell({id, filledCells, onClick}: Props) {
  const cellInList: ICell | undefined = useMemo(() => {
    return filledCells.find((filledCell) => id === filledCell.id);
  },[filledCells]);

  const cellState: ICellState = useMemo(() => {
    if (cellInList === undefined) {
      return {
        isFilled: false,
        isDamaged: false,
      }
    }

    return {
      isFilled: cellInList.isFilled,
      isDamaged: cellInList.isDamaged,
    }
  },[cellInList]);

  const handleClick = useCallback(() => {
    onClick(cellInList);
  }, [cellInList, onClick]);

  return (
    <div className="flex items-center justify-center w-12 h-12 border border-black" onClick={handleClick}>
      <CellContent state={cellState} />
    </div>
  );
}
