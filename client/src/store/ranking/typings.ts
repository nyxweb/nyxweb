export interface HOFCharacter {
  name: string
  reset: number
  level: number
  class: number
  date: string
  rank: number
}

export interface RankingState {
  hof: {
    characters: HOFCharacter[] | null
    loading: boolean
  }
  character: {
    data: Character | null
    loading: boolean
  }
}

interface Guild {
  name: string
  mark: string
  master: string
  score: number
  position: number
}

export interface Character {
  name: string
  class: number
  level: number
  reset: number
  total_points: number
  equipment: string
  zen: number
  map_number: number
  map_pos_x: number
  map_pos_y: number
  pk_count: number
  ctl_code: number
  chat_limit_time: number
  ban_post: number
  is_married: number
  marry_name: string
  quest_in_progress: number
  quest_number: number
  quest_monsters: number
  sky_event_wins: number
  is_vip: number
  vip_expiration: number
  guild: null | Guild
}
