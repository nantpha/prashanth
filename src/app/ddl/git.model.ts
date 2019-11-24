//Model class represent Git URL info i.e. folders & files
export class Tree {
    path: string;
    type: string;
    url: string;
}

export class CommitRequest {
    projectId: string;
    branch: string;
    file: string;
    authorEmail: string;
    authorName: string;
    content: string;
}

export class CommitResponse {
    success: boolean;
	message: string;
}