export type MediaType = {
    id: number;
    url: string;
    type: string;
    articleId: number;
};

export type MediaCreate = {
    url: string;
    type: string;
    articleId: number;
};

export type MediaGet = {
    url: string;
};

export type MediaListGet = {
    articleId: number;
};