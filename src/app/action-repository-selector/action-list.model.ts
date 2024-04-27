export class ActionList {
    listItems: ActionListItem[] = [];
}

export class ActionListItem {
    actionCode!: string;
    buyDate?: Date;
}
