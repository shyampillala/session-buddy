
// Chrome extension API type declarations
declare global {
  interface Window {
    chrome?: typeof chrome;
  }
}

declare namespace chrome {
  namespace tabs {
    interface Tab {
      id?: number;
      url?: string;
      title?: string;
      favIconUrl?: string;
      pinned?: boolean;
      active?: boolean;
      windowId?: number;
      index?: number;
    }

    function query(queryInfo: any): Promise<Tab[]>;
    function create(createProperties: { url: string }): Promise<Tab>;
  }
}

export {};
