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

function buildMemberCard(member, index) {
  const color = colorPalette[index % colorPalette.length];

  return `
    <div class="member-card">
      <div class="member-avatar" style="background:${color.bg}; color:${color.text};">
        ${getInitials(member.name)}
      </div>
      <p class="member-name">${member.name}</p>
      <p class="member-role">${member.role}</p>
      <span class="member-skill-badge" style="background:${color.bg}; color:${color.text};">
        ${member.skill}
      </span>
      <div class="member-socials">
        <a href="${member.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  `;
}

const teamGrid = document.getElementById("teamGrid");
if (teamGrid && Array.isArray(teamMembers)) {
  teamGrid.innerHTML = teamMembers.map((member, i) => buildMemberCard(member, i)).join("");
}
