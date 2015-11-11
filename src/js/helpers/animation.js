var PX = 'px';

export function toPx(value) {
  return value + PX;
}

// Place one element directly over the other.
export function stack(topEl, bottomEl) {
  topEl.style.top = toPx(bottomEl.offsetTop);
  topEl.style.left = toPx(bottomEl.offsetLeft);
}

// Retrieves the correct top property value based on the board and card.
export function getTop(board, card) {
  return toPx(board.offsetTop + ((board.offsetHeight / 2) - (card.offsetHeight)));
}

export function getEndingLeft(board, card) {
  return toPx(board.offsetLeft + (card.offsetWidth * 2.6));
}
