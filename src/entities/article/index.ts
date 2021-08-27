import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user';
import 'reflect-metadata';
import { Media } from '../media';
import { CareArticleUser } from '../careArticleUser';

@Entity()
export class Article {
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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  isDeleted: boolean;

  @Column()
  userId: number;

  @ManyToOne((type) => User, (user) => user.articles) @JoinColumn({ name: 'userId' }) user: User;
  @OneToMany((type) => Media, (media) => media.article) mediaList: Media[];
  @OneToMany((type) => CareArticleUser, (careArticleUser) => careArticleUser.article) careArticleUsers: CareArticleUser[];
}
