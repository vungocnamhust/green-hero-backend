import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Feedback } from '../feedback';
import { CareFeedbackUser } from '../careFeedbackUser';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar?: string | null;

  @Column()
  phone: string;

  @Column({ nullable: true })
  province?: string | null;

  @Column({ nullable: true })
  district?: string | null;

  @Column({ nullable: true })
  ward?: string | null;

  @Column({ nullable: true })
  address?: string | null;

  @OneToMany((type) => Feedback, (feedback) => feedback.user) feedbacks: Feedback[];
  @OneToMany((type) => CareFeedbackUser, (careFeedbackUser) => careFeedbackUser.user) careFeedbackUsers: CareFeedbackUser[];
}
