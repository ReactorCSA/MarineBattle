import { useMemo, useState } from 'react';
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
        {id: 24, coordinates: [5, 5], isFilled: true, isDamaged: false},
        {id: 34, coordinates: [5, 6], isFilled: true, isDamaged: false},
        {id: 44, coordinates: [5, 7], isFilled: true, isDamaged: false},
      ],
    },
    {
      id: 411,
      cells: [
        {id: 81, coordinates: [3, 0], isFilled: true, isDamaged: false},
        {id: 82, coordinates: [4, 0], isFilled: true, isDamaged: false},
        {id: 83, coordinates: [5, 0], isFilled: true, isDamaged: false},
        {id: 84, coordinates: [6, 0], isFilled: true, isDamaged: false},
      ],
    },
  ]);

  const handleCellClick = (id: number) => {
    const currentCell: { item: ICell | null } = {item: null};
    const currentShip: { item: IShip | null } = {item: null};

    ships.forEach((ship) => {
      ship.cells.forEach((shipCell) => {
        if (shipCell.id === id) {
          currentCell.item = shipCell;
          currentShip.item = ship;
        }
      })
    })

    if (currentShip.item === null || currentCell.item === null) {
      return
    }

    currentShip.item.cells = currentShip.item.cells.map((item) => {
      if (item.id === currentCell.item?.id) {
        return {
          ...item,
          isDamaged: true,
        }
      }
      return item;
    });

    const newShips = ships.map((item) => {
      if (item.id === currentShip.item?.id) {
        return currentShip.item
      }
      return item;
    })
    setShips(newShips);
  };

  const filledCells: ICell[] = useMemo(() => {
    return ships.map((ship) => ship.cells).flat();
  }, [ships]);

  console.log(ships);
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid grid-cols-10 grid-rows-10">
        {battleFieldCoordinates.map(({id}, index) => (
          <Cell key={index} filledCells={filledCells} id={id} onClick={handleCellClick} />
        ))}
      </div>
    </div>
  );
}
