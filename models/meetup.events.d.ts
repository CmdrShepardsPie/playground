export interface IMeetupVenue {
  id: number;
  name: string;
  lat: number;
  lon: number;
  repinned: boolean;
  address_1: string;
  city: string;
  country: string;
  localized_country_name: string;
  zip: string;
  state: string;
  address_2: string;
}

export interface IMeetupGroup {
  created: any;
  name: string;
  id: number;
  join_mode: string;
  lat: number;
  lon: number;
  urlname: string;
  who: string;
  localized_location: string;
  region: string;
}

export interface IMeetupEvent {
  created: any;
  id: string;
  name: string;
  status: string;
  time: any;
  local_date: string;
  local_time: string;
  updated: any;
  utc_offset: number;
  waitlist_count: number;
  yes_rsvp_count: number;
  venue: IMeetupVenue;
  group: IMeetupGroup;
  link: string;
  description: string;
  visibility: string;
  duration?: number;
  manual_attendance_count?: number;
  how_to_find_us: string;
}
