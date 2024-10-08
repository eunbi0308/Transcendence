import { Entity, Column, PrimaryGeneratedColumn, Binary } from 'typeorm';

export enum user_status {
	Offline = "offline",
	Online = "online",
	Waiting = "waiting",
	Playing = "playing"
}

@Entity()
export class USER {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: "binary" })
  avatar: Buffer;

  @Column({ nullable: false })
  nickname: string;

  @Column({ default: false })
  is_second_auth_done: boolean;

  @Column({ type: "smallint" })
  second_auth_code: number;

  @Column({ nullable: false, })
  second_auth_email: string;

  @Column({
			type: "int",
			nullable: false,
			default: 0 
	})
  ladder_level: number;

  @Column({
	type: "enum",
	enum: user_status,
	default: user_status.Offline
  })
  user_status: user_status;

}