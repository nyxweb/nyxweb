import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'
import { Character } from './Character'

@Entity('MEMB_STAT')
export class MEMB_STAT {
  @PrimaryColumn('varchar', { unique: true, length: 10 })
  memb___id: string

  @Column('tinyint')
  ConnectStat: number

  @Column('varchar', { length: 10, nullable: true })
  ServerName: string

  @Column('varchar', { length: 15, nullable: true })
  IP: string

  @Column('smalldatetime', { nullable: true })
  ConnectTM: Date

  @Column('smalldatetime', { nullable: true })
  DisConnectTM: Date

  @ManyToOne(() => Character, (char) => char.memb_stat)
  @JoinColumn({ name: 'memb___id' })
  character: Character[]
}
