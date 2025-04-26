export const buildQueryTableInclusion = (...args: string[]) => {
  return args.reduce(
    (acc, relation) => {
      acc[relation] = true;
      return acc;
    },
    {} as Record<string, boolean>,
  );
};
