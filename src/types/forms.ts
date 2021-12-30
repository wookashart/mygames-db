export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface RegisterInitialValuesData {
  name: string;
  email: string;
  password: string;
  password2: string;
  town: string;
  birthday: string | null;
  gender: number;
  description: string;
}

export interface DropdownOptionsData {
  title: string;
  value: number | string;
}

export interface CreateGameInitialValuesData {
  name: string;
  namePl: string;
  nameSort: string;
  groupName: string;
  firstDate: Date | null;
  platforms: DropdownOptionsData[] | null | undefined;
  tags: DropdownOptionsData[] | null | undefined;
  producer: DropdownOptionsData | null | undefined;
  distributor: DropdownOptionsData | null | undefined;
  distributorPl: DropdownOptionsData | null | undefined;
  earlyAccess: boolean;
  platformsDates: CreateGamePlatformsDatesData[];
  description: string;
  cpuMin: string;
  gpuMin: string;
  ramMin: string;
  systemMin: DropdownOptionsData | null | undefined;
  directxMin: DropdownOptionsData | null | undefined;
  hddMin: string;
  cpuReccomended: string;
  gpuReccomended: string;
  ramReccomended: string;
  systemReccomended: DropdownOptionsData | null | undefined;
  directxReccomended: DropdownOptionsData | null | undefined;
  hddReccomended: string;
}

export interface CreateGamePlatformsDatesData {
  platformId: number;
  platformName: string;
  date: Date | null;
}
