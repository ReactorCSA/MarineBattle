import { useMemo, useState, useCallback } from 'react';
import type { MetaFunction } from "@remix-run/node";
import { Cell } from '~/components/Cell/Cell';
import {ICell, ICellBase, IShip} from "~/interface";

export const meta: MetaFunction = () => {
  return [
    { title: "Marine Battle" },
  ];
};

const battleFieldSize = 10;

const battleFieldRows = Array.from({ length: battleFieldSize }).fill(null) as null[];
const battleFieldColumns = Array.from({ length: battleFieldSize }).fill(null) as null[];

const battleFieldCoordinates: ICellBase[] = battleFieldRows.map((_, rowIndex) => (
  battleFieldColumns.map((_, columnIndex) => {
    return {
      id: Number(`${rowIndex}${columnIndex}`),
      coordinates: [rowIndex, columnIndex],
    };
  })
)).flat();

/*
  Чтобы убедиться, что следующая клетка является частью корабля, нужно проверить следующие условия:
  1. Индекс строки или столбца текущей клетки равен индексу строки или столбца предыдущей клетки соответственно.
  2. Индекс строки или столбца текущей клетки больше на 1 или меньше на 1 индекса строки или столбца предыдущей клетки соответственно.

  Что нужно сделать для проверки условий выше:
  1. Сохранять индексы строки и столбца всех клеток.
 */

export default function Index() {
  const [ships, setShips] = useState<IShip[]>([
    {
      id: 428,
      cells: [
        {id: 24, coordinates: [5, 5], isDamaged: false, isFilled: true},
        {id: 34, coordinates: [5, 6], isDamaged: false, isFilled: true},
        {id: 44, coordinates: [5, 7], isDamaged: false, isFilled: true},
      ],
    },
    {
      id: 411,
      cells: [
        {id: 81, coordinates: [3, 0], isDamaged: false, isFilled: true},
        {id: 82, coordinates: [4, 0], isDamaged: false, isFilled: true},
        {id: 83, coordinates: [5, 0], isDamaged: false, isFilled: true},
        {id: 84, coordinates: [6, 0], isDamaged: false, isFilled: true},
      ],
    },
  ]);

  const handleCellClick = useCallback((cell: ICell | undefined) => {
    let currentShip: IShip;

    if (cell === undefined) {
      return;
    }

    ships.forEach((ship) => {
      ship.cells.forEach((shipCell) => {
        if (shipCell.id === cell.id) {
          currentShip = ship;
        }
      });
    });

    if (!currentShip) {
      return;
    }

    if (cell.isDamaged) {
      return;
    }

    currentShip.cells = currentShip.cells.map((item) => {
      if (item.id === cell.id) {
        return {
          ...item,
          isDamaged: true,
        }
      }

      return item;
    });

    const newShips = ships.map((item) => {
      if (item.id === currentShip.id) {
        return currentShip;
      }

      return item;
    });

    setShips(newShips);
  },[ships]);

  const filledCells: ICell[] = useMemo(() => {
    return ships.map((ship) => ship.cells).flat();
  }, [ships]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid grid-cols-10 grid-rows-10 cursor-pointer">
        {battleFieldCoordinates.map(({id}, index) => (
          <Cell key={index} filledCells={filledCells} id={id} onClick={handleCellClick} />
        ))}
      </div>
    </div>
  );
}
