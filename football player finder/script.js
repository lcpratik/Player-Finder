const input = document.getElementById("playerInput");
const btn = document.getElementById("searchBtn");

const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");

const imgEl = document.getElementById("playerImg");
const fallbackEl = document.getElementById("fallback");

const nameEl = document.getElementById("playerName");
const metaEl = document.getElementById("playerMeta");
const teamEl = document.getElementById("playerTeam");
const teamChipEl = document.getElementById("playerTeamChip");
const nationEl = document.getElementById("playerNation");
const posEl = document.getElementById("playerPos");
const bornEl = document.getElementById("playerBorn");
const bioEl = document.getElementById("playerBio");

btn.addEventListener("click", searchPlayer);

// Press Enter to search
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchPlayer();
});

async function searchPlayer() {
  const q = input.value.trim();
  if (!q) {
    showError("Type a player name first.");
    return;
  }
  clearError();

  try {
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(q)}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Request failed (${res.status})`);

    const data = await res.json();

    if (!data.player || data.player.length === 0) {
      throw new Error("No player found. Try full name (e.g. 'Kevin De Bruyne').");
    }

    // Pick best match (first result)
    const p = data.player[0];

    const playerName = p.strPlayer || "Unknown";
    const team = p.strTeam || "Unknown";
    const nation = p.strNationality || "Unknown";
    const pos = p.strPosition || "Unknown";
    const born = p.dateBorn || "Unknown";
    const desc = (p.strDescriptionEN || "").trim();

    nameEl.textContent = playerName;
    teamEl.textContent = team;
    teamChipEl.textContent = team;
    nationEl.textContent = nation;
    posEl.textContent = pos;
    bornEl.textContent = born;

    metaEl.textContent = `${nation} • ${pos}`;

    // Shorten bio (optional)
    bioEl.textContent = desc ? shorten(desc, 320) : "No bio available for this player.";

    // Image
    const img = p.strThumb || p.strCutout || "";
    if (img) {
      imgEl.src = img;
      imgEl.style.display = "block";
      fallbackEl.style.display = "none";
    } else {
      imgEl.style.display = "none";
      fallbackEl.style.display = "flex";
    }

  } catch (err) {
    showError(err.message);
    resetCard();
  } 
}

function shorten(text, max) {
  if (text.length <= max) return text;
  return text.slice(0, max).trim() + "…";
}

function showError(msg) {
  errorEl.hidden = false;
  errorEl.textContent = msg;
}

function clearError() {
  errorEl.hidden = true;
  errorEl.textContent = "";
}

function resetCard() {
  nameEl.textContent = "Search a player";
  metaEl.textContent = "Nationality • Position";
  teamEl.textContent = "—";
  teamChipEl.textContent = "Team";
  nationEl.textContent = "—";
  posEl.textContent = "—";
  bornEl.textContent = "—";
  bioEl.textContent = "";

  imgEl.style.display = "none";
  fallbackEl.style.display = "flex";
}
