const DIRECTION_VALUE: Record<Direction, number> = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
}

export type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT'

export function canTurn(fromDirection: Direction, toDirection: Direction) {
  const delta = Math.abs(DIRECTION_VALUE[fromDirection] - DIRECTION_VALUE[toDirection]);
  return delta !== 2;
}

export function getVelocity(direction: Direction, speed: number): { velocityX: number, velocityY: number } {
  if (direction === 'UP') return { velocityX: 0, velocityY: -speed };
  if (direction === 'RIGHT') return { velocityX: speed, velocityY: 0 };
  if (direction === 'DOWN') return { velocityX: 0, velocityY: speed };
  if (direction === 'LEFT') return { velocityX: -speed, velocityY: 0 };
}
