export interface IBirthday {
  month: number;
  year: number;
  day: number;
}

export interface ITopic {
  urlkey: string;
  name: string;
  id: number;
}

export interface IPhoto {
  highres_link: string;
  photo_id: number;
  base_url: string;
  type: string;
  photo_link: string;
  thumb_link: string;
}

export interface IFacebook {
  identifier: string;
}

export interface IOtherServices {
  facebook: IFacebook;
}

export interface ICommon {
}

export interface ISelf {
  common: ICommon;
}

export interface IResult {
  birthday: IBirthday;
  country: string;
  hometown: string;
  city: string;
  topics: ITopic[];
  joined: number;
  link: string;
  bio: string;
  photo: IPhoto;
  lon: number;
  other_services: IOtherServices;
  name: string;
  visited: number;
  self: ISelf;
  id: number;
  state: string;
  lang: string;
  lat: number;
  status: string;
}

export interface IMeta {
  next: string;
  method: string;
  total_count: number;
  link: string;
  count: number;
  description: string;
  lon: string;
  title: string;
  url: string;
  id: string;
  updated: number;
  lat: string;
}

export interface IJson {
  results: IResult[];
  meta: IMeta;
}

export interface IMeetupUser {
  provider: string;
  id: number;
  displayName: string;
  _raw: string;
  _json: IJson;
}
