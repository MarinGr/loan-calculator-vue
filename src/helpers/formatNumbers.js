export default function formatNumbers(number) {
  const formatted = number
    .toString()
    .replace(/,/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return formatted;
}
