import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import 'reflect-metadata';
import { Feedback } from '../feedback';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  type: string;

  @Column()
  feedbackId: number;

  @ManyToOne((type) => Feedback, (feedback) => feedback.mediaList) @JoinColumn({ name: 'feedbackId' }) feedback: Feedback;
}
