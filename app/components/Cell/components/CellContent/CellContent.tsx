import { ICellState } from '~/interface';

export function CellContent({isFilled, isDamaged}: ICellState) {
  if (isDamaged) {
    return 'X';
  }

  if (isFilled) {
    return '[ ]';
  }

  return null;
}
