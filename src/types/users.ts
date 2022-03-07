import { GameStatusDetailType, GameStatusType } from './basic';
import { PlatformsData, TagsData } from './games';

export interface UserData {
  id: number;
  name: string;
  email: string;
  type: number;
  city: string;
  birthday: string;
  gender: number;
  description: string;
  avatar: string;
  register: string;
}

export interface UserLibraryGamesData {
  addDate: Date;
  cover: string;
  earlyAccess: boolean;
  favourite: boolean;
  firstDate: Date | null;
  gameId: number;
  id: number;
  name: string;
  namePl: string;
  platforms: PlatformsData[];
  playedTime: number;
  producerId: number;
  status: GameStatusType;
  statusDate: Date | null;
  statusDetail: GameStatusDetailType;
  tags: TagsData[];
  userDistributionId: number;
  userLibrary: UserLibraryData[];
  userPlatformId: number;
  userRatio: number | null;
  userRatioDate: Date | null;
}

export interface UserLibraryData {
  distributionId: number;
  distributionName: string;
  platformCode: string;
  platformDescription: string;
  platformId: number;
  platformName: string;
  platformProducerId: number;
  platformProducerName: string;
}
