import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './../users/user.entity'
@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    message: string;
    // @Column
    // date: string;
    @ManyToOne(() => User, (user) => user.chat)
    user: User;
}