import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'
import { nyx_resources } from './nyx_resources'

@Entity('MEMB_INFO')
export class MEMB_INFO {
  @PrimaryColumn('varchar', { unique: true, length: 10 })
  memb___id: string

  @Column('varchar', { length: 10 })
  memb__pwd: string

  @Column('varchar', { length: 10 })
  memb_name: string = 'NyxWeb'

  @Column('char', { length: 13 })
  sno__numb: string = 'NyxWeb'

  @Column('char', { length: 6 })
  post_code: string

  @Column('varchar', { length: 50 })
  addr_info: string

  @Column('varchar', { length: 50 })
  addr_deta: string

  @Column('varchar', { length: 20 })
  tel__numb: string

  @Column('varchar', { length: 15 })
  phon_numb: string

  @Column('varchar', { length: 50 })
  mail_addr: string

  @Column('varchar', { length: 50 })
  fpas_ques: string

  @Column('varchar', { length: 50 })
  fpas_answ: string

  @Column('char', { length: 2 })
  job__code: string

  @Column('datetime')
  appl_days: Date = new Date()

  @Column('datetime')
  modi_days: Date = new Date()

  @Column('datetime')
  out__days: Date = new Date()

  @Column('datetime')
  true_days: Date = new Date()

  @Column('char', { length: 1 })
  mail_chek: string

  @Column('char', { length: 1 })
  bloc_code: string = '0'

  @Column('char', { length: 1 })
  ctl1_code: string = '0'

  @Column('int')
  IsVip: number = 0

  @Column('int')
  VipExpirationTime: number = 0

  @OneToOne(() => nyx_resources)
  @JoinColumn({ name: 'memb___id' })
  resources: nyx_resources
}
