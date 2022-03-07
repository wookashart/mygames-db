/* eslint-disable @typescript-eslint/no-explicit-any */

import { colors } from '@material-ui/core';
import { GameStatusDetailType, GameStatusType } from '../types/basic';
import { ObjKeyStringValString } from '../types/other';

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

export const minutesToHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
};

export const statusName = (status: GameStatusType) => {
  const statusTranslate: ObjKeyStringValString = {
    played: 'Ograna',
    skip: 'Pominięta',
    plan: 'Planowana',
  };

  return status ? statusTranslate[status] : '-';
};

export const statusDetailName = (status: GameStatusDetailType) => {
  const statusTranslate: ObjKeyStringValString = {
    '100p': 'na 100%',
    endless: 'gra bez wyraźnego zakończenia',
    dropped: 'porzucona',
    story: 'sama fabuła',
  };

  return status ? statusTranslate[status] : '-';
};

export const setStatusColor = (status: GameStatusType) => {
  const colorsList: ObjKeyStringValString = {
    played: colors.green[700],
    skip: colors.red[700],
    plan: colors.orange[700],
  };

  return status ? colorsList[status] : 'white';
};
