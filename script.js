// ---------- Greeting (uses the visitor's device time) ----------
function getGreeting(hour) {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Good night";
}

const now = new Date();
document.getElementById("greeting").textContent = getGreeting(now.getHours());
document.getElementById("date").textContent = now.toLocaleDateString("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

// ---------- News (read from news.json, saved by n8n) ----------
function fillCard(key, item) {
  const card = document.getElementById("news-" + key);
  card.querySelector(".headline").textContent = item.title;
  const link = card.querySelector(".source");
  link.href = item.link;
  link.target = "_blank";
  link.rel = "noopener";
  try {
    link.textContent = "Read on " + new URL(item.link).hostname.replace("www.", "");
  } catch (e) {
    link.textContent = "Read more";
  }
}

function showError(message) {
  document.querySelectorAll(".card .headline").forEach((el) => {
    el.textContent = message;
  });
}

async function loadNews() {
  try {
    const response = await fetch("news.json?v=" + Date.now());
    if (!response.ok) throw new Error("HTTP " + response.status);
    const data = await response.json();
    fillCard("domestic", data.domestic);
    fillCard("international", data.international);
    fillCard("sports", data.sports);
  } catch (error) {
    console.error("News error:", error);
    showError("Headlines are unavailable right now.");
  }
}

loadNews();
