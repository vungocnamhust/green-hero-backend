export type ArticleType = {
  id: number;
  title: string;
  description: string;
  avatar: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  adminId: number;
};

export type ArticleCreateParamsType = {
  title: string;
  description?: string;
  avatar?: string;
  content: string;
  adminId: number;
};

export type ArticleUpdateParamsType = {
  title?: string;
  description?: string;
  avatar?: string;
  content?: string;
  isDeleted?: boolean;
};
