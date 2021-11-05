import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('nyx_hof')
export class nyx_hof {
  @PrimaryColumn()
  account: string

  @Column()
  name: string

  @Column('int')
  reset: number

  @Column('int')
  level: number

  @Column('int')
  class: number

  @Column('datetime')
  date: Date

  @Column('int')
  rank: number

  @Column()
  admin_account: string
}
