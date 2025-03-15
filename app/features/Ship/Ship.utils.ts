import { ICell, IShip } from '~/interface';

export function getShipWithDamagedCellByID(ship: IShip, cellID: ICell['id']): IShip {
  const newShip = {...ship};

  newShip.cells = newShip.cells.map((item) => {
    if (item.id === cellID) {
      return {
        ...item,
        isDamaged: true,
      }
    }

    return item;
  });

  return newShip;
}

export function isShipSunk(ship: IShip) {
  return ship.cells.every((cell) => cell.isDamaged);
}

export function isShipDamaged(ship: IShip) {
  return ship.cells.some((cell) => cell.isDamaged);
}
