document.querySelectorAll("td").forEach((t) => {
  const dateLabel = t.querySelector(".date-text").innerText;
  if (/20\d\d|January|February|March|April/.test(dateLabel)) {
    const image = t.querySelector("img");
    const parts = image.src.split("/");
    const id = parts[parts.length - 1].split(".")[0];
    console.log(id);
    const fParams = { method: "POST", credentials: "include", body: JSON.stringify({ uuid: id }), headers: { authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZjQ2NWI0ZC02NTU0LTQzOTctOTljYS05MDcyN2Q4MDllMjciLCJpc3MiOiJodHRwczovL2FwaS5wb2NrZXRjYXN0cy5jb20iLCJzY29wZXMiOlsid2VicGxheWVyIl0sImV4cCI6MTU1NjM3MTE3MCwianRpIjoiMzVlOGJmN2EtZTNiNy00OTM3LTgyOGMtNmExZDk2ZjhkOTg5In0.mBeRVem5ePCqB-7HUjxDWAptkZwqiCEs25G0pWTH1eY", "content-type": "application/json" } };
    fetch("https://api.pocketcasts.com/user/podcast/unsubscribe", fParams);
  }
});
