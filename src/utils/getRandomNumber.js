export default (Min, Max) => {
  // 不含最大值
  return (Math.floor(Math.random() * Max + 1) - 1) + Min
}
