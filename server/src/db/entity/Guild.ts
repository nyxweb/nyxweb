import { Entity, Column, PrimaryColumn, JoinColumn, OneToMany } from 'typeorm'
import { GuildMember } from './GuildMember'

@Entity('Guild')
export class Guild {
  @PrimaryColumn('varchar', { unique: true, length: 8 })
  G_Name: string

  @Column('varbinary', { length: 32 })
  G_Mark: Buffer

  @Column('int')
  G_Score: number

  @Column('varchar', { length: 10 })
  G_Master: string

  @Column('int')
  G_Count: number

  @Column('varchar', { length: 60 })
  G_Notice: string

  @Column('int')
  Number: number

  @Column('int')
  G_Type: number

  @Column('int')
  G_Rival: number

  @Column('int')
  G_Union: number

  @OneToMany(() => GuildMember, (member) => member.guild)
  @JoinColumn({ name: 'G_Name' })
  members: GuildMember
}
