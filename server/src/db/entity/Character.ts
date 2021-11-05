import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('Character')
export class Character {
  @Column('varchar', { length: 10 })
  AccountID: string

  @PrimaryColumn('varchar', { unique: true, length: 10 })
  Name: string

  @Column('int')
  cLevel: number

  @Column('int')
  LevelUpPoint: number

  @Column('tinyint')
  Class: number

  @Column('int')
  Experience: number

  @Column('smallint')
  Strength: number

  @Column('smallint')
  Dexterity: number

  @Column('smallint')
  Vitality: number

  @Column('smallint')
  Energy: number

  @Column('smallint')
  Leadership: number

  @Column('varbinary', { length: 1080 })
  Inventory: Buffer

  @Column('int')
  Money: number

  @Column('smallint')
  MapNumber: number

  @Column('smallint')
  MapPosX: number

  @Column('smallint')
  MapPosY: number

  @Column('tinyint')
  MapDir: number

  @Column('int')
  PkCount: number

  @Column('int')
  PkLevel: number

  @Column('int')
  PkTime: number

  @Column('smalldatetime')
  MDate: Date

  @Column('smalldatetime')
  LDate: Date

  @Column('tinyint')
  CtlCode: number

  @Column('smallint')
  ChatLimitTime: number

  @Column('int')
  Resets: number

  @Column('int')
  BanPost: number

  @Column('int')
  IsMarried: number

  @Column('varchar', { length: 11 })
  MarryName: number

  @Column('int')
  GrandResets: number

  @Column('int')
  QuestInProgress: number

  @Column('int')
  QuestNumber: number

  @Column('int')
  QuestMonsters: number

  @Column('int')
  SkyEventWins: number

  @Column('int')
  IsVip: number

  @Column('int')
  VipExpirationTime: number
}
