export interface ICellState {
  isFilled: boolean;
  isDamaged: boolean;
}

export interface ICellBase {
  id: number;
  coordinates: number[];
}

export type ICell = ICellBase & ICellState;