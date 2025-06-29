// background.js

function generateId() {
  return Date.now().toString(); // Use timestamp or your own uuid function
}

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
});


chrome.runtime.onInstalled.addListener(() => {
  console.log("Session Buddy extension installed!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    if (message.action === "saveTabs") {
      const { name, description } = message;
      chrome.tabs.query({ currentWindow: true }, function (tabs) {
        if (chrome.runtime.lastError) {
          console.error("Error querying tabs:", chrome.runtime.lastError);
          sendResponse({ status: "error", error: chrome.runtime.lastError.message });
          return;
        }

        const tabData = tabs.map(tab => ({
          url: tab.url,
          title: tab.title,
          favIconUrl: tab.favIconUrl,
          pinned: tab.pinned,
          lastAccessed: Date.now(),
        }));

        chrome.storage.local.get("sessions", data => {
          if (chrome.runtime.lastError) {
            console.error("Error getting sessions:", chrome.runtime.lastError);
            sendResponse({ status: "error", error: chrome.runtime.lastError.message });
            return;
          }

          const sessions = data.sessions || [];
          const session = {
            id: generateId(),
            name,
            description,
            createdAt: Date.now(),
            tabs: tabData,
          };
          sessions.push(session);

          chrome.storage.local.set({ sessions }, () => {
            if (chrome.runtime.lastError) {
              console.error("Error saving sessions:", chrome.runtime.lastError);
              sendResponse({ status: "error", error: chrome.runtime.lastError.message });
              return;
            }
            sendResponse({ status: "success", session });
          });
        });
      });
      return true; // Keep async channel open
    }

    if (message.action === "getSessions") {
      chrome.storage.local.get("sessions", data => {
        if (chrome.runtime.lastError) {
          console.error("Error getting sessions:", chrome.runtime.lastError);
          sendResponse({ status: "error", error: chrome.runtime.lastError.message });
          return;
        }
        sendResponse(data.sessions || []);
      });
      return true;
    }

    if (message.action === "deleteSession") {
      const { id } = message;
      chrome.storage.local.get("sessions", data => {
        if (chrome.runtime.lastError) {
          console.error("Error getting sessions for deletion:", chrome.runtime.lastError);
          sendResponse({ status: "error", error: chrome.runtime.lastError.message });
          return;
        }

        const sessions = (data.sessions || []).filter(session => session.id !== id);
        chrome.storage.local.set({ sessions }, () => {
          if (chrome.runtime.lastError) {
            console.error("Error saving sessions after deletion:", chrome.runtime.lastError);
            sendResponse({ status: "error", error: chrome.runtime.lastError.message });
            return;
          }
          sendResponse({ status: "deleted" });
        });
      });
      return true;
    }

    if (message.action === "restoreSession") {
      const { tabs } = message; // array of tab { url }
      tabs.forEach(tab => {
        chrome.tabs.create({ url: tab.url });
      });
      sendResponse({ status: "restored" });
      return true;
    }

    //collections section

if (message.action === "addCollection") {
  const { name, description } = message;
  chrome.storage.local.get(["collections"], data => {
    const collections = data.collections || [];
    const newCollection = {
      id: generateId(),
      name,
      description,
      sessionIds: [],
      createdAt: Date.now()
    };
    collections.push(newCollection);
    chrome.storage.local.set({ collections }, () => {
      sendResponse({ status: "success", collection: newCollection });
    });
  });
  return true;
}

if (message.action === "getCollections") {
  chrome.storage.local.get(["collections"], data => {
    sendResponse({ status: "success", collections: data.collections || [] });
  });
  return true;
}

if (message.action === "deleteCollection") {
  const { collectionId } = message;
  chrome.storage.local.get(["collections"], data => {
    let collections = data.collections || [];
    collections = collections.filter(c => c.id !== collectionId);
    chrome.storage.local.set({ collections }, () => {
      sendResponse({ status: "success" });
    });
  });
  return true;
}

if (message.action === "addSessionToCollection") {
  const { collectionId, sessionId } = message;
  chrome.storage.local.get(["collections"], data => {
    const collections = data.collections || [];
    const collection = collections.find(c => c.id === collectionId);
    if (collection && !collection.sessionIds.includes(sessionId)) {
      collection.sessionIds.push(sessionId);
      chrome.storage.local.set({ collections }, () => {
        sendResponse({ status: "success", collection });
      });
    } else {
      sendResponse({ status: "error", error: "Collection not found or session already added" });
    }
  });
  return true;
}

if (message.action === "removeSessionFromCollection") {
  const { collectionId, sessionId } = message;
  chrome.storage.local.get(["collections"], data => {
    const collections = data.collections || [];
    const collection = collections.find(c => c.id === collectionId);
    if (collection) {
      collection.sessionIds = collection.sessionIds.filter(id => id !== sessionId);
      chrome.storage.local.set({ collections }, () => {
        sendResponse({ status: "success", collection });
      });
    } else {
      sendResponse({ status: "error", error: "Collection not found" });
    }
  });
  return true;
}

if (message.action === "updateCollection") {
  const { collectionId, name, description } = message;
  chrome.storage.local.get(["collections"], data => {
    const collections = data.collections || [];
    const collection = collections.find(c => c.id === collectionId);
    if (collection) {
      if (name !== undefined) collection.name = name;
      if (description !== undefined) collection.description = description;
      chrome.storage.local.set({ collections }, () => {
        sendResponse({ status: "success", collection });
      });
    } else {
      sendResponse({ status: "error", error: "Collection not found" });
    }
  });
  return true;
}
  } catch (err) {
    console.error("Exception in onMessage listener:", err);
    sendResponse({ status: "error", error: err.message });
    return true;
  }

});



