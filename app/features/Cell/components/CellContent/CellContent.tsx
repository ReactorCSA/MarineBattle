import { ICellState } from '~/interface';

interface Props {
  state: ICellState;
}

export function CellContent({state}: Props) {
  if (state.isDamaged) {
    return 'X';
  }

  if (state.isFilled) {
    return '[ ]';
  }

  return null;
}
