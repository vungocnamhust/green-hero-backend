import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user';
import 'reflect-metadata';
import { Media } from '../media';
import { Article } from '../article';

@Entity()
export class CareArticleUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: Number;

  @Column()
  articleId: Number;

  @ManyToOne((type) => User, (user) => user.careArticleUsers) @JoinColumn({ name: 'userId' }) user: User;
  @ManyToOne((type) => Article, (article) => article.careArticleUsers) @JoinColumn({ name: 'articleId' }) article: Article;
}
