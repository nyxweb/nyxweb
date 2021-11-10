import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('nyx_account_logs')
export class nyx_account_logs {
  @PrimaryColumn('varchar', { length: 10 })
  account: string

  @Column('varchar', { length: 50 })
  type: string

  @Column('nvarchar', { length: 2000 })
  log_message: string

  @Column('text', { nullable: true })
  properties?: string

  @Column('datetime')
  date: Date

  @Column('varchar', { length: 50 })
  ip: string
}
