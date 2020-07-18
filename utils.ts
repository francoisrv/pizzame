export default function isFloat(n: number) {
  return n === +n && n !== (n|0)
}