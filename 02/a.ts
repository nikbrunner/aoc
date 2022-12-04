// const input = await Deno.readTextFile("./sample.txt");
const input = await Deno.readTextFile("./input.txt");

enum ShapeKey {
  Rock = "A",
  Paper = "B",
  Scissor = "C",
}

enum CounterShapeKey {
  Rock = "X",
  Paper = "Y",
  Scissor = "Z",
}

type Play = [ShapeKey, CounterShapeKey];

type Outcome = {
  outcome: "win" | "draw" | "loose";
  score: number;
};

type OutcomeMap = {
  [key in CounterShapeKey]: Outcome;
};

interface Plays extends OutcomeMap {
  key: ShapeKey;
  value: number;
}

const parseRounds = (input: string): Play[] => {
  return input
    .split("\n")
    .filter((element) => element)
    .map((play) => play.split(" ") as Play);
};

const win: Outcome = {
  outcome: "win",
  score: 6,
};

const draw: Outcome = {
  outcome: "draw",
  score: 3,
};

const loose: Outcome = {
  outcome: "loose",
  score: 0,
};

const plays: Plays[] = [
  {
    key: ShapeKey.Rock,
    value: 1,
    [CounterShapeKey.Rock]: draw,
    [CounterShapeKey.Scissor]: loose,
    [CounterShapeKey.Paper]: win,
  },
  {
    key: ShapeKey.Paper,
    value: 2,
    [CounterShapeKey.Rock]: loose,
    [CounterShapeKey.Scissor]: win,
    [CounterShapeKey.Paper]: draw,
  },
  {
    key: ShapeKey.Scissor,
    value: 3,
    [CounterShapeKey.Rock]: win,
    [CounterShapeKey.Scissor]: draw,
    [CounterShapeKey.Paper]: loose,
  },
];

const score = parseRounds(input).reduce((score, round) => {
  const [theirMove, myMove] = round;
  const play = plays.find((shape) => shape.key === theirMove);

  if (play) {
    const shapeValue = play.value;
    const outcomeScore = play[myMove].score;
    return score + shapeValue + outcomeScore;
  } else {
    return 0;
  }
}, 0);

console.log("a:score", score);
