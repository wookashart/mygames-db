import { AuditData } from './other';

export interface GamesListData {
  cover: string;
  earlyAccess: boolean;
  firstDate: Date | null;
  id: number;
  name: string;
  namePl: string;
  platforms: PlatformsData[];
  producerId: number;
  producerName: string;
  tags: TagsData[];
}

export interface PlatformsData {
  code: string;
  date: Date | string | null;
  description: string;
  id: number;
  name: string;
  producerId: number;
  producerName: string;
}

export interface TagsData {
  description: string;
  id: number;
  name: string;
}

export interface GamesFiltersData {
  name: string;
}

export interface GameDetailData {
  id: number;
  name: string;
  namePl: string;
  nameSort: string;
  firstDate: Date | null;
  earlyAccess: boolean;
  cover: string;
  description: string;
  platforms: PlatformsData[];
  tags: TagsData[];
  requirements: GameRequirementsTypesData;
  audit: AuditData;
  producer: ProducerData;
  distributor: DistributorData;
  distributorPl: DistributorData;
  dates: GameDatesData[];

  // temp
  dlc: any; // should be an array
  related: any; // should be an array
}

export interface GameRequirementsTypesData {
  min: GameRequirementsData;
  recommended: GameRequirementsData;
}

export interface GameRequirementsData {
  cpu: string;
  gpu: string;
  ram: string;
  directx: GameDirectXData | null;
  system: GameSystemData | null;
  hdd: string;
}

export interface GameDirectXData {
  id: number;
  name: string;
}

export interface GameSystemData {
  id: number;
  name: string;
}

export interface ProducerData {
  id: number;
  name: string;
  description: string;
}

export interface DistributorData {
  id: number;
  name: string;
  description: string;
}

export interface GameDatesData {
  date: Date;
  platformId: number;
  platformName: string;
  platformCode: string;
}

export interface GameRatioData {
  ratio: number | string | null;
  totalCount: number;
}

export interface UserFunctionData {
  library: UserFunctionLibraryData[] | null;
  ratio: UserFunctionRatioData | null;
  status: UserFunctionStatusData | null;
}

export interface UserFunctionLibraryData {
  date: Date;
  platform: UserFunctionLibraryPlatformsData[];
  distribution: UserFunctionLibraryDistributions[];
}

export interface UserFunctionLibraryPlatformsData {
  id: number;
  name: string;
  code: string;
}

export interface UserFunctionLibraryDistributions {
  id: number;
  name: string;
}

export interface UserFunctionRatioData {
  ratio: number;
  date: Date;
}

export interface UserFunctionStatusData {
  status: string;
  statusDetail: string;
  date: Date;
  time: number;
  favourite: boolean;
}
