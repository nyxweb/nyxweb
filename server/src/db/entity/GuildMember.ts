import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { Character } from '.'
import { Guild } from './Guild'

@Entity('GuildMember')
export class GuildMember {
  @PrimaryColumn('varchar', { unique: true, length: 10 })
  Name: string

  @Column('varchar', { length: 8 })
  G_Name: string

  @Column('tinyint')
  G_Level: number

  @Column('tinyint')
  G_Status: number

  @ManyToOne(() => Guild, (guild) => guild.members)
  @JoinColumn({ name: 'G_Name' })
  guild: Guild

  @OneToOne(() => Character)
  @JoinColumn({ name: 'Name' })
  character: Character
}
