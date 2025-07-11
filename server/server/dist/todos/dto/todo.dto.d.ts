export declare enum Status {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}
export declare enum Visibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}
export declare class CreateTodoDto {
    title: string;
    description: string;
    status?: Status;
    visibility?: Visibility;
}
