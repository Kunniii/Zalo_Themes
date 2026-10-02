import { useEffect, useState } from "react";
import { themePresets } from "./themePresets";

async function saveAndApplyTheme(settings) {
  const extension = globalThis.chrome;
  if (!extension?.storage?.local || !extension.tabs?.query) return;

  try {
    await extension.storage.local.set(settings);
    const [tab] = await extension.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;

    const message = {
      type: "zalo-theme:update",
      themeEnabled: settings.themeEnabled,
      themeVariables: settings.themeVariables,
    };

    try {
      await extension.tabs.sendMessage(tab.id, message);
    } catch {
      await extension.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    }
  } catch {
    return;
  }
}

const SwitchButton = () => {
  const [settings, setSettings] = useState({ enabled: false, selectedTheme: "light" });
  const [activeTab, setActiveTab] = useState("light");

  useEffect(() => {
    const storage = globalThis.chrome?.storage;
    if (!storage) return;

    storage.local
      .get(["themeEnabled", "selectedTheme", "themeVariables"])
      .then((stored) => {
        const selectedTheme = Object.hasOwn(themePresets, stored.selectedTheme)
          ? stored.selectedTheme
          : "light";
        const themeVariables = stored.themeVariables ?? themePresets[selectedTheme].variables;

        if (!stored.themeVariables || selectedTheme !== stored.selectedTheme) {
          storage.local.set({ selectedTheme, themeVariables });
        }

        setSettings({
          enabled: stored.themeEnabled ?? false,
          selectedTheme,
        });
        setActiveTab(themePresets[selectedTheme].category);
      });

    const onStorageChanged = (changes, areaName) => {
      if (areaName !== "local") return;

      setSettings((current) => ({
        enabled: changes.themeEnabled
          ? changes.themeEnabled.newValue ?? false
          : current.enabled,
        selectedTheme: changes.selectedTheme
          ? changes.selectedTheme.newValue ?? "light"
          : current.selectedTheme,
      }));
    };

    storage.onChanged.addListener(onStorageChanged);
    return () => storage.onChanged.removeListener(onStorageChanged);
  }, []);

  const toggleTheme = (event) => {
    const enabled = event.target.checked;
    setSettings((current) => ({ ...current, enabled }));
    saveAndApplyTheme({
      themeEnabled: enabled,
      selectedTheme: settings.selectedTheme,
      themeVariables: themePresets[settings.selectedTheme].variables,
    });
  };

  const selectTheme = (event) => {
    const selectedTheme = event.currentTarget.dataset.theme;
    setSettings({ enabled: true, selectedTheme });
    saveAndApplyTheme({
      themeEnabled: true,
      selectedTheme,
      themeVariables: themePresets[selectedTheme].variables,
    });
  };

  const themesInTab = Object.entries(themePresets).filter(
    ([, preset]) => preset.category === activeTab,
  );

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold">Chọn giao diện</span>
        <label className="flex items-center gap-2 text-sm">
          <span>Áp dụng</span>
          <input
            type="checkbox"
            role="switch"
            checked={settings.enabled}
            onChange={toggleTheme}
            className="h-5 w-5 accent-blue-600"
            aria-label="Bật hoặc tắt chủ đề Zalo"
          />
        </label>
      </div>
      <div className="mb-3 grid grid-cols-2 rounded-md bg-slate-200 p-1" role="tablist" aria-label="Loại giao diện">
        {[
          ["light", "Sáng"],
          ["dark", "Tối"],
        ].map(([tab, label]) => {
          const count = Object.values(themePresets).filter(
            (preset) => preset.category === tab,
          ).length;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded px-3 py-2 text-sm font-semibold ${activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                }`}
            >
              {label} <span className="text-xs">({count})</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {themesInTab.map(([id, preset]) => (
          <button
            key={id}
            type="button"
            data-theme={id}
            onClick={selectTheme}
            aria-pressed={settings.selectedTheme === id}
            aria-label={`Chọn giao diện ${preset.label}`}
            className={`rounded-md border px-2.5 py-2 text-left transition-colors ${settings.selectedTheme === id
              ? "border-slate-900 bg-white ring-1 ring-slate-900"
              : "border-slate-200 bg-white hover:border-slate-400"
              }`}
          >
            <span className="mb-1.5 flex gap-1" aria-hidden="true">
              {preset.swatches.map((color) => (
                <span
                  key={color}
                  className="h-3.5 w-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </span>
            <span className="block text-sm font-semibold leading-tight">{preset.label}</span>
            <span className="block text-xs text-slate-500">{preset.mood}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SwitchButton;
