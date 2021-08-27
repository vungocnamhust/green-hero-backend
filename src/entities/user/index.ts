import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../article';
import { CareArticleUser } from '../careArticleUser';

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

  @OneToMany((type) => Article, (article) => article.user) articles: Article[];
  @OneToMany((type) => CareArticleUser, (careArticleUser) => careArticleUser.user) careArticleUsers: CareArticleUser[];
}
