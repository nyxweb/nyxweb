import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm'
import { Character } from './Character'

@Entity('AccountCharacter')
export class AccountCharacter {
  @Column('int', { unique: true })
  Number: number

  @PrimaryColumn('varchar', { unique: true, length: 10, name: 'Id' })
  Id: string

  @Column('varchar', { length: 10 })
  GameID1: string

  @Column('varchar', { length: 10 })
  GameID2: string

  @Column('varchar', { length: 10 })
  GameID3: string

  @Column('varchar', { length: 10 })
  GameID4: string

  @Column('varchar', { length: 10 })
  GameID5: string

  @Column('varchar', { length: 10 })
  GameIDC: string

  @Column('tinyint')
  MoveCnt: number

  @OneToMany(() => Character, (char) => char.account_character)
  @JoinColumn({ name: 'Id', referencedColumnName: 'AccountID' })
  character: Character[]
}
