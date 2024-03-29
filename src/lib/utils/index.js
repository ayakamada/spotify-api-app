import { keyMap } from "@/lib/const/keyMap";


// Format milliseconds into MM:SS
export const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};



//渡された引数とkeyMapのkeyを比較して、一致したらkeyMapのvalueを返す
export const getKey = (key) => {
  return keyMap[key];
}