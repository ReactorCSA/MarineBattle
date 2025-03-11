import { CellState } from '~/interface';

export function CellContent({isFilled, isDamaged}: CellState) {
  if (isDamaged) {
    return 'X';
  }

  if (isFilled) {
    return '[ ]';
  }

  return null;
}
