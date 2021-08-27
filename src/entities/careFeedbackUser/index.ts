import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user';
import 'reflect-metadata';
import { Media } from '../media';
import { Feedback } from '../feedback';

@Entity()
export class CareFeedbackUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: Number;

  @Column()
  feedbackId: Number;

  @ManyToOne((type) => User, (user) => user.careFeedbackUsers) @JoinColumn({ name: 'userId' }) user: User;
  @ManyToOne((type) => Feedback, (feedback) => feedback.careFeedbackUsers) @JoinColumn({ name: 'feedbackId' }) feedback: Feedback;
}
