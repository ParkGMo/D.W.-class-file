// export ->  함수 앞 직접 보내기,  마지막에 한번에 보내기 둘다 가능

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
