export type FeedbackType = {
  id: number;
  title: string;
  description: string;
  avatar: string;
  content: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  userId: number;
};

export type FeedbackCreateParamsType = {
  title: string;
  description?: string;
  avatar?: string;
  content: string;
  location?: string;
  userId: number;
  userName: string;
  userPhone: string;
  province?: string;
  ward?: string;
  district?: string;
  address?: string;
};

export type FeedbackUpdateParamsType = {
  title?: string;
  description?: string;
  avatar?: string;
  content?: string;
  isDeleted?: boolean;
  location?: string;
};
