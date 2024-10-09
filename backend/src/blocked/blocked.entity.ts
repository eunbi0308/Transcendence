import { Entity, Column} from 'typeorm';

@Entity()
export class Blocked {
  @Column({ type: "integer" })
  blocked_user_id: number;

  @Column({ type: "integer" })
  user_id: number;

  @Column({ type: 'timestamp with time zone' })
  date: Date;
}