export function useSessionBuddy() {
  const saveCurrentTabs = (name: string, description?: string) => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ action: "saveTabs", name, description }, (response) => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError.message);
        else resolve(response);
      });
    });
  };

  const getSessions = () => {
    return new Promise<any[]>((resolve, reject) => {
      chrome.runtime.sendMessage({ action: "getSessions" }, (response) => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError.message);
        else resolve(response);
      });
    });
  };

  const deleteSession = (id: string) => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ action: "deleteSession", id }, (response) => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError.message);
        else resolve(response);
      });
    });
  };

  const restoreSession = (tabs: any[]) => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ action: "restoreSession", tabs }, (response) => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError.message);
        else resolve(response);
      });
    });
  };

  return { saveCurrentTabs, getSessions, deleteSession, restoreSession };
}
