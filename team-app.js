const colorPalette = [
  { bg: "#2A0E12", text: "#FF4D5A" },
  { bg: "#1F1F1F", text: "#ED1C24" },
  { bg: "#300C10", text: "#FF6B75" },
  { bg: "#231417", text: "#F43F4B" },
  { bg: "#141414", text: "#FF5A64" },
];

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0] || "")
    .join("")
    .toUpperCase();
}

function isValidExternalUrl(url = "") {
  return /^https?:\/\//i.test(url.trim());
}

async function getLinkedInProfileImage(linkedinUrl = "") {
  if (!isValidExternalUrl(linkedinUrl)) {
    return "";
  }

  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(linkedinUrl)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return "";
    }

    const html = await response.text();
    const ogImageMatch =
      html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i);

    const imageUrl = ogImageMatch?.[1] || "";
    return isValidExternalUrl(imageUrl) ? imageUrl : "";
  } catch (error) {
    return "";
  }
}

function buildMemberCard(member, index, profileImageUrl = "") {
  const color = colorPalette[index % colorPalette.length];
  const githubLink = isValidExternalUrl(member.github)
    ? `<a href="${member.github}" target="_blank" rel="noopener noreferrer">GitHub</a>`
    : "";
  const linkedinLink = isValidExternalUrl(member.linkedin)
    ? `<a href="${member.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`
    : "";
  const socials = `${githubLink}${linkedinLink}` || "<span>No social links</span>";
  const avatarContent = profileImageUrl
    ? `<img src="${profileImageUrl}" alt="${member.name} profile photo" loading="lazy" referrerpolicy="no-referrer" />`
    : getInitials(member.name);

  return `
    <div class="member-card">
      <div class="member-avatar" style="background:${color.bg}; color:${color.text};">
        ${avatarContent}
      </div>
      <p class="member-name">${member.name}</p>
      <div class="member-socials">
        ${socials}
      </div>
    </div>
  `;
}

const teamGrid = document.getElementById("teamGrid");

async function renderTeamMembers() {
  if (!teamGrid || !Array.isArray(teamMembers)) {
    return;
  }

  const cards = await Promise.all(
    teamMembers.map(async (member, index) => {
      const profileImageUrl = await getLinkedInProfileImage(member.linkedin);
      return buildMemberCard(member, index, profileImageUrl);
    })
  );

  teamGrid.innerHTML = cards.join("");
}

renderTeamMembers();
