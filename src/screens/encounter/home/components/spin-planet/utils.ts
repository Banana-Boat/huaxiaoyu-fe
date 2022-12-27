// 获取不重复随机下标
export const getRandomIndex = (total: number, batchSize: number): number[] => {
  if (batchSize >= total)
    return Array(total)
      .fill(0)
      .map((_, idx) => idx);

  let num = 0;
  let resList: number[] = [];
  while (num < batchSize) {
    const idx = Math.floor(Math.random() * total);
    if (resList.indexOf(idx) === -1) {
      resList.push(idx);
      num++;
    }
  }

  // console.log(resList);

  return resList;
};
