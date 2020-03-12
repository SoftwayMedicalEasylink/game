export function saveHighScore(highScore: number): void {
    if (localStorage) {
        localStorage.setItem('highScore', highScore.toString());
    }
}

export function loadHighScore(): number {
    if (localStorage) {
        return parseInt(localStorage.getItem('highScore') || '0', 10);
    } else {
        return 0;
    }
}
