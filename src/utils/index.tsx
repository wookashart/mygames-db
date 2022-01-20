/* eslint-disable @typescript-eslint/no-explicit-any */

interface URLParametersData {
  name?: string;
}

interface QueryData {
  [key: string]: string | undefined;
}

interface QuerParameters {
  id?: number | string;
  name?: string;
}

export const isValidDate = (d: any) => {
  return d instanceof Date && !isNaN(d as any);
};

export const addParametersToUrl = (parameters: URLParametersData) => {
  const paramNames: Array<string> = Object.keys(parameters);
  const query: QueryData = {};

  paramNames.forEach((name: string) => {
    if (parameters.name !== '') {
      query[name] = parameters.name;
    }
  });

  return query;
};

export const getFiltersFromRouter = (query: QuerParameters) => {
  const filters = {
    name: query.name ? query.name : '',
  };

  return filters;
};
