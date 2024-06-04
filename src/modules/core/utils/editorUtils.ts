import { SetStateAction } from "react";

export const capitalizeEveryWord = (str: string): string => {
  if (str===undefined || str.length === 0) {
      return str;
  }
  
  const words = str.split(" "); 
  const capitalizedWords = words.map(word => {
      if (word.length === 0) {
          return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
}

export const getCanvasDimension = (target: string, dimension: string) : SetStateAction<number> => {
  const canvasBoundingRect = document
    .getElementsByClassName(target)[0]
    ?.getBoundingClientRect();

  return dimension==="height" ? canvasBoundingRect.height : canvasBoundingRect.width;
}

export const convertXToPercentage = (x: number, canvasWidth: number) => {
  return (x * 100) / canvasWidth;
}