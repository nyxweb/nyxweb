import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('nyx_resources')
export class nyx_resources {
  @PrimaryColumn('varchar', { unique: true, nullable: false })
  account: string

  @Column('varchar', { length: 7680 })
  storage: string = ''

  @Column('bigint')
  zen: string = '0'

  @Column('bigint')
  credits: string = '0'

  @Column('int')
  chaos: number = 0

  @Column('int')
  bless: number = 0

  @Column('int')
  soul: number = 0

  @Column('int')
  life: number = 0

  @Column('int')
  creation: number = 0

  @Column('int')
  rena: number = 0

  @Column('int')
  stone: number = 0

  @Column('int')
  boh: number = 0

  @Column('int')
  box1: number = 0

  @Column('int')
  box2: number = 0

  @Column('int')
  box3: number = 0

  @Column('int')
  box4: number = 0

  @Column('int')
  box5: number = 0

  @Column('int')
  heart: number = 0
}
