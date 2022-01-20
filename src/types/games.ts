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
  date: Date | null;
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
