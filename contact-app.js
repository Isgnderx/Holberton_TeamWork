// Footer: current year
document.getElementById("footerYear").textContent = new Date().getFullYear();

// Footer: social links from teamMembers data
(function buildFooterSocials() {
  const list = document.getElementById("footerSocial");
  if (!list || !Array.isArray(teamMembers)) return;

  const seen = new Set();
  teamMembers.forEach((member) => {
    [
      { url: member.github, label: `${member.name} — GitHub` },
      { url: member.linkedin, label: `${member.name} — LinkedIn` },
    ].forEach(({ url, label }) => {
      if (url && /^https?:\/\//i.test(url) && !seen.has(url)) {
        seen.add(url);
        const li = document.createElement("li");
        li.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
        list.appendChild(li);
      }
    });
  });
})();

// Contact form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const feedback = document.getElementById("formFeedback");
  const btn = this.querySelector(".submit-btn");
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  feedback.className = "form-feedback";

  if (!name || !email || !message) {
    feedback.textContent = "Please fill in all fields.";
    feedback.classList.add("error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    feedback.textContent = "Please enter a valid email address.";
    feedback.classList.add("error");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Sending…";

  // Simulate send — replace with a real endpoint (e.g. Formspree) if needed
  setTimeout(() => {
    feedback.textContent = "Message sent! We'll get back to you soon.";
    feedback.classList.add("success");
    btn.disabled = false;
    btn.textContent = "Send Message";
    this.reset();
  }, 1000);
});
