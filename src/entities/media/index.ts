import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import 'reflect-metadata';
import { Article } from '../article';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  type: string;

  @Column()
  articleId: number;

  @ManyToOne((type) => Article, (article) => article.mediaList) @JoinColumn({ name: 'articleId' }) article: Article;
}
