declare function nextPage(): Promise<void>;
declare function processRows(rows: NodeListOf<Element>): Promise<void>;
declare function changeSharing(row: Element): Promise<any>;
declare function changeTimeline(row: Element): Promise<void>;
declare function untagFromTimeline(): Promise<void>;
declare function getMenuFor(text: string): Promise<{}>;
declare function getDialogFor(text: string): Promise<{}>;
declare function cleanupMenu(): Promise<any>;
declare function clickItem(item: any): Promise<any>;
declare function cleanupElement(item: any): Promise<any>;
//# sourceMappingURL=facebook.d.ts.map