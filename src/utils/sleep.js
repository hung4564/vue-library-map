export default function sleep(milliSecond) {
  return new Promise((resolve) => setTimeout(resolve, milliSecond));
}
