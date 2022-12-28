// 14岁-40岁
let cur = 0;
export const yearOptionList = Array(26)
  .fill(0)
  .map(() => new Date().getFullYear() - 15 - cur++);
