export async function asyncForEach<A extends Array<V> = any[], V = any>(
  array: A,
  callback: (v: V, i: number, array: A) => any,
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
