export interface IResources {
  storage: string
  zen: number
  gold: number
  chaos: number
  bless: number
  soul: number
  life: number
  creation: number
  rena: number
  stone: number
  boh: number
  box1: number
  box2: number
  box3: number
  box4: number
  box5: number
  heart: number
}

export interface IUser {
  memb___id: string
  mail_addr: string
  appl_days: string
  bloc_code: string
  ctl1_code: string
  IsVip: 0 | 1
  VipExpirationTime: number
  main_character?: string
  resources: IResources
}

export interface IMEMB_STAT {
  ConnectStat: 0 | 1
  ConnectTM: Date
  DisConnectTM: Date
}
