export interface PlatformProducersData {
  pproducer_id: number;
  pproducer_name: string;
}

export interface PlatformsData {
  platform_id: number;
  platform_name: string;
  platform_sort_name: string;
  platform_code: string;
  platform_producer_id: string;
  platform_date: Date | null;
  platform_description: string;
  platform_producer: string;
}

export interface TagData {
  tag_id: number;
  tag_name: string;
  tag_description: string;
}

export interface ProducerData {
  producer_id: number;
  producer_name: string;
  producer_description: string;
}

export interface DistributorData {
  distributor_id: number;
  distributor_name: string;
  distributor_description: string;
}

export interface DistributorPlData {
  distributor_pl_id: number;
  distributor_pl_name: string;
  distributor_pl_description: string;
}

export interface DirectXData {
  directx_id: number;
  directx_name: string;
}

export interface WindowsData {
  windows_id: number;
  windows_name: string;
}

export interface GameDistributionData {
  id: number;
  name: string;
  platforms: GameDistributionPlatformsData[];
}

export interface GameDistributionPlatformsData {
  id: number;
  name: string;
  code: string;
}

export interface StatsData {
  lastAddedGames: LastAddedGamesData[];
  lastAddedDLC: LastAddedDLCData[];
}

export interface LastAddedGamesData {
  id: number;
  name: string;
  cover: string;
}

export interface LastAddedDLCData {
  id: number;
  gameId: number;
  gameName: string;
  name: string;
  cover: string;
}

export interface CompanyData {
  id: number;
  name: string;
  type: string[];
  description: string;
  www: string;
  address: string;
  logo: string;
}
