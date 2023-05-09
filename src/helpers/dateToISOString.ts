export default function dateToISOString(date: unknown) {
  return (date as Date).toISOString();
}
