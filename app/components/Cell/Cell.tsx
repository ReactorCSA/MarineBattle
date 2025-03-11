import { CellContent } from './components/CellContent/CellContent';

interface Props {
  filledCells: {
    id: number;
    coordinates: number[];
    isDamaged: boolean;
  }[];
  row: number
  column: number;
}

export function Cell({filledCells, row, column}: Props) {
  const cellInList = filledCells.find(({coordinates: [cx, cy]}) => (
    cx === row && cy === column
  ));

  const isFilled = cellInList !== undefined;
  const isDamaged = isFilled && cellInList.isDamaged;

  return (
    <div className="flex items-center justify-center w-12 h-12 border border-black">
      <CellContent isDamaged={isDamaged} isFilled={isFilled} />
    </div>
  );
}
