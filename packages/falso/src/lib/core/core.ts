import { random } from '../random';

export interface FakeOptions {
  length?: number;
  limit?: number;
  locale?: any | string[];
}

export type markRequired<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

export type Return<T, O extends FakeOptions> = [O] extends [never]
  ? T
  : O['length'] extends number
  ? T[]
  : T;

type FactoryFunction<T> = (i: number) => T;

export function fake<T, Options extends FakeOptions>(
  data: string[],
  options?: Options
): Return<T, Options> {

  const limit = options?.limit || 0;
  if (options?.limit) {
    data = data.filter(item => item.length >= limit)
  }

  const dataSource = Array.isArray(data)
    ? () => randElement(data)
    : (data as FactoryFunction<T>);

  if (options?.length === undefined) {
    return dataSource(0) as any;
  }

  return Array.from({ length: options.length }, (_, index) =>
    dataSource(index)
  ) as any;
}

export function randElement<T>(arr: Readonly<T[]>) {
  return arr[Math.floor(random() * arr.length)];
}

export interface RandomInRangeOptions {
  min?: number;
  max?: number;
  fraction?: number;
}

export function getRandomInRange({
  min = 1.0,
  max = 9999.99,
  fraction = 0,
}: RandomInRangeOptions = {}) {
  return Number((random() * (max - min) + min).toFixed(fraction));
}
