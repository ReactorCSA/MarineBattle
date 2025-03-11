interface Props {
  isFilled: boolean;
  isDamaged: boolean;
}

export function CellContent({isFilled, isDamaged}: Props) {
  if (isDamaged) {
    return 'X';
  }

  if (isFilled) {
    return '[ ]';
  }

  return null;
}
