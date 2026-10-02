const originalValues = new Map();
let themeEnabled = false;
let themeVariables = {};

function restoreElement(element, values) {
  for (const [name, original] of values) {
    if (original.value) {
      element.style.setProperty(name, original.value, original.priority);
    } else {
      element.style.removeProperty(name);
    }
  }
}

function applyTheme() {
  const root = document.documentElement;
  if (!root) return;

  const targets = new Set([root, ...root.querySelectorAll(".light, .dark")]);

  for (const [element, values] of originalValues) {
    if (!themeEnabled || !targets.has(element)) {
      restoreElement(element, values);
      originalValues.delete(element);
      continue;
    }

    for (const name of values.keys()) {
      if (!Object.hasOwn(themeVariables, name)) {
        restoreElement(element, new Map([[name, values.get(name)]]));
        values.delete(name);
      }
    }
  }

  if (!themeEnabled) return;

  for (const element of targets) {
    let values = originalValues.get(element);
    if (!values) {
      values = new Map();
      originalValues.set(element, values);
    }

    for (const [name, value] of Object.entries(themeVariables)) {
      if (!name.startsWith("--") || typeof value !== "string") continue;

      if (!values.has(name)) {
        values.set(name, {
          value: element.style.getPropertyValue(name),
          priority: element.style.getPropertyPriority(name),
        });
      }

      element.style.setProperty(name, value);
    }
  }
}

function updateSettings(changes = {}) {
  if (changes.themeEnabled) themeEnabled = changes.themeEnabled.newValue ?? false;
  if (changes.themeVariables) themeVariables = changes.themeVariables.newValue ?? {};
  applyTheme();
}

chrome.storage.local
  .get({ themeEnabled: false, themeVariables: {} })
  .then((settings) => {
    themeEnabled = settings.themeEnabled;
    themeVariables = settings.themeVariables;
    applyTheme();
  });

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local") updateSettings(changes);
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "zalo-theme:update") {
    updateSettings({
      themeEnabled: { newValue: message.themeEnabled },
      themeVariables: { newValue: message.themeVariables },
    });
  }
});

new MutationObserver(applyTheme).observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class"],
});
