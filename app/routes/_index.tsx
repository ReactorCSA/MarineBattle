import type { MetaFunction } from "@remix-run/node";
import { useMemo, useState, useCallback } from 'react';
import { getShipWithDamagedCellByID, isShipDamaged, isShipSunk } from '~/features/Ship';
import {ICell, ICellBase, IShip} from "~/interface";
import { Cell } from '~/features/Cell';

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
    let currentShipID: IShip['id'] | null = null;

    if (cell === undefined) {
      return;
    }

    ships.forEach((ship) => {
      ship.cells.forEach((shipCell) => {
        if (shipCell.id === cell.id) {
          currentShipID = ship.id;
          return;
        }
      });
    });

    if (currentShipID === null) {
      return;
    }

    if (cell.isDamaged) {
      return;
    }

    const newShips = ships.map((item) => {
      if (item.id === currentShipID) {
        return getShipWithDamagedCellByID(item, cell.id);
      }

      return item;
    });

    setShips(newShips);
  }, [ships]);

  const filledCells: ICell[] = useMemo(() => {
    return ships.map((ship) => ship.cells).flat();
  }, [ships]);

  const gameScore = useMemo(() => {
    const total = ships.length;
    const sunk = ships.filter(isShipSunk).length;
    const damaged = ships.filter(isShipDamaged).length;

    return {
      total,
      sunk,
      damaged,
    }
  }, [ships]);

  return (
    <div className="flex flex-col space-y-6 h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex gap-4">
          <div>Кораблей: {gameScore.total}</div>
          <div>Потоплено: {gameScore.sunk}</div>
          <div>Повреждено: {gameScore.damaged}</div>
        </div>
      </div>
      <div className="grid grid-cols-10 grid-rows-10 cursor-pointer">
        {battleFieldCoordinates.map(({id}, index) => (
          <Cell key={index} filledCells={filledCells} id={id} onClick={handleCellClick} />
        ))}
      </div>
    </div>
  );
}
