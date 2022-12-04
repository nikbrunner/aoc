const input = await Deno.readTextFile("./input.txt");

const baskets = input.split("\n\n");

const summedBaskets = baskets.map((basket) => {
  const calories = basket.split("\n");

  return calories.reduce((acc, calory) => {
    // Parse the string and have a fallback if the parsed string results in NaN
    const parsedCalory = parseInt(calory, 10) || 0;
    return acc + parsedCalory;
  }, 0);
});

const basketWithMostCalories = Math.max(...summedBaskets);

console.log("🚀 ~ basketWithMostCalories", basketWithMostCalories);
