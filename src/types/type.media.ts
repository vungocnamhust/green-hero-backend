export type MediaType = {
    id: number;
    url: string;
    type: string;
    feedbackId: number;
};

export type MediaCreate = {
    url: string;
    type: string;
    feedbackId: number;
};

export type MediaGet = {
    url: string;
};

export type MediaListGet = {
    feedbackId: number;
};