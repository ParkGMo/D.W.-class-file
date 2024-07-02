// export ->  함수 앞 직접 보내기,  마지막에 한번에 보내기 둘다 가능

const WINS = {
  rock: "scissor",
  scissor: "paper",
  paper: "rock",
};

export function compareHand(a, b) {
  // 승리 ==> 1, 패배 ==> -1, 무승부 ==> 0
  if (WINS[a] === b) return 1;
  if (WINS[b] === a) return -1;
  return 0;
}

function random(n) {
  return Math.ceil(Math.random() * n);
}

export function generateRandomHand() {
  const num = random(3);
  if (num == 1) {
    return "rock";
  } else if (num == 2) {
    return "scissor";
  } else {
    return "paper";
  }
}
