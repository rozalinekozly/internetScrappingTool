async function fetchJobs() {
  const res = await fetch('/api/drushim');
  const data = await res.json();
  const jobs = data.jobs || [];

  const container = document.getElementById('job-list');
  container.innerHTML = '';

  jobs.forEach(job => {
    const card = document.createElement('div');
    card.className = 'job-card';

    card.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.company} | ${job.location}</p>
      <a href="${job.url}" target="_blank">לצפייה במשרה</a>
    `;

    container.appendChild(card);
  });
}

fetchJobs();
