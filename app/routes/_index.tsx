import { useMemo, useState } from 'react';
import type { MetaFunction } from "@remix-run/node";
import { Cell } from '~/components/Cell/Cell';

export const meta: MetaFunction = () => {
  return [
    { title: "Marine Battle" },
  ];
};

const battleFieldSize = 10;

const battleFieldRows = Array.from({ length: battleFieldSize }).fill(null) as null[];
const battleFieldColumns = Array.from({ length: battleFieldSize }).fill(null) as null[];

const battleFieldCoordinates = battleFieldRows.map((_, rowIndex) => (
  battleFieldColumns.map((_, columnIndex) => [rowIndex, columnIndex])
)).flat();

/*
  Чтобы убедиться, что следующая клетка является частью корабля, нужно проверить следующие условия:
  1. Индекс строки или столбца текущей клетки равен индексу строки или столбца предыдущей клетки соответственно.
  2. Индекс строки или столбца текущей клетки больше на 1 или меньше на 1 индекса строки или столбца предыдущей клетки соответственно.

  Что нужно сделать для проверки условий выше:
  1. Сохранять индексы строки и столбца всех клеток.
 */

export default function Index() {
  const [ships] = useState([
    {
      id: 428,
      cells: [
        {id: 34, coordinates: [5, 5], isDamaged: true},
        {id: 34, coordinates: [5, 6], isDamaged: false},
        {id: 34, coordinates: [5, 7], isDamaged: false},
      ],
    },
    {
      id: 411,
      cells: [
        {id: 34, coordinates: [3, 0], isDamaged: true},
        {id: 34, coordinates: [4, 0], isDamaged: true},
        {id: 34, coordinates: [5, 0], isDamaged: true},
        {id: 34, coordinates: [6, 0], isDamaged: false},
      ],
    },
  ]);

  const filledCells = useMemo(() => {
    return ships.map((ship) => ship.cells).flat();
  }, [ships]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid grid-cols-10 grid-rows-10">
        {battleFieldCoordinates.map(([row, column], index) => (
          <Cell key={index} filledCells={filledCells} row={row} column={column} />
        ))}
      </div>
    </div>
  );
}
