export interface Weather {
  location: Location;
  current: Current;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface Current {
  temp_c: number;
  temp_f: number;
  condition: Condition;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}
