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
