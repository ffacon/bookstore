export interface INews {
    id?: number;
    author?: string;
    category?: string;
    content?: string;
    likes?: number;
}

export class News implements INews {
    constructor(public id?: number, public author?: string, public category?: string, public content?: string, public likes?: number) {}
}
