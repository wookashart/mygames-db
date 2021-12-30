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
