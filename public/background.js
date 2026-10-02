async function updateActionButton() {
    const { themeEnabled = false, selectedTheme = "light" } =
        await chrome.storage.local.get(["themeEnabled", "selectedTheme"]);
    const themeNames = {
        light: "Sáng",
        dark: "Tối",
        sakura: "Hoa anh đào",
        matcha: "Trà xanh",
        apricot: "Nắng mai",
        bougainvillea: "Hoa giấy",
        sunrise: "Bình minh",
        tidal: "Thủy triều",
        nocturne: "Đêm tím",
        wisteria: "Tử đằng",
        lagoon: "Đầm xanh",
        aurora: "Cực quang",
        ember: "Than hồng",
        oled: "Đen OLED",
        plum: "Mận chín",
        sky: "Mây xanh",
        peach: "Đào sữa",
        galaxy: "Ngân hà",
        neon: "Đêm neon",
        goldenNight: "Đêm hoàng kim",
    };
    const state = themeEnabled ? "BẬT" : "TẮT";
    const themeName = themeNames[selectedTheme] ?? "Sáng";

    await chrome.action.setBadgeText({ text: state });
    await chrome.action.setBadgeBackgroundColor({
        color: themeEnabled ? "#16803c" : "#64748b",
    });
    await chrome.action.setTitle({
        title: themeEnabled ? `Đang bật chủ đề ${themeName}` : "Chủ đề Zalo đang tắt",
    });
}

chrome.runtime.onInstalled.addListener(updateActionButton);
chrome.runtime.onStartup.addListener(updateActionButton);
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (
        areaName === "local" &&
        (changes.themeEnabled || changes.selectedTheme)
    ) {
        updateActionButton();
    }
});

updateActionButton();