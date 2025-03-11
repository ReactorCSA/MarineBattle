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

const flattened = [
  {id: 34, coordinates: [5, 5], isDamaged: false},
  {id: 34, coordinates: [5, 6], isDamaged: false},
  {id: 34, coordinates: [5, 7], isDamaged: false},
  {id: 34, coordinates: [3, 0], isDamaged: true},
  {id: 34, coordinates: [4, 0], isDamaged: true},
  {id: 34, coordinates: [5, 0], isDamaged: true},
  {id: 34, coordinates: [6, 0], isDamaged: false},
]

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
