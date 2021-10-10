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
