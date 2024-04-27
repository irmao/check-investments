export class ActionHistory {
    historyItems: ActionHistoryItem[] = [];
}

export class ActionHistoryItem {
    actionCode!: string;
    buyDate!: Date;
}
