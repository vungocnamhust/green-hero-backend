import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user';
import 'reflect-metadata';
import { Media } from '../media';
import { CareFeedbackUser } from '../careFeedbackUser';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  avatar: string;

  @Column()
  location: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  userName?: string;

  @Column({ nullable: true })
  userPhone?: string;

  @Column({ nullable: true })
  province?: string | null;

  @Column({ nullable: true })
  district?: string | null;

  @Column({ nullable: true })
  ward?: string | null;

  @Column({ nullable: true })
  address?: string | null;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  isDeleted: boolean;

  @Column()
  userId: number;

  @ManyToOne((type) => User, (user) => user.feedbacks) @JoinColumn({ name: 'userId' }) user: User;
  @OneToMany((type) => Media, (media) => media.feedback) mediaList: Media[];
  @OneToMany((type) => CareFeedbackUser, (careFeedbackUser) => careFeedbackUser.feedback) careFeedbackUsers: CareFeedbackUser[];
}
