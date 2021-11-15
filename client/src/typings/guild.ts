export interface IGuild {
  G_Name: string
  G_Mark: string
  G_Score: number
  G_Master: string
  levels: number
  members: number
}

export interface IGuildMember {
  G_Name: string
  G_Status: 0 | 32 | 64 | 128
  guild: IGuild
}
