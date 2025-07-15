import fetch from 'node-fetch';

export default async function handler(req, res) {
  const url = 'https://www.drushim.co.il/api/jobs/index?page=1&cat=5';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    const filtered = (data.Items || []).filter(job => {
      const txt = `${job.Title} ${job.Description || ''}`.toLowerCase();
      return (
        txt.includes('ללא ניסיון') ||
        txt.includes('junior') ||
        txt.includes('entry level') ||
        txt.includes('סטודנט') ||
        txt.includes('ג\'וניור')
      );
    }).map(job => ({
      title: job.Title,
      company: job.CompanyName,
      location: job.LocationText,
      url: `https://www.drushim.co.il${job.Url}`,
      posted: job.PublishDate
    }));

    res.status(200).json({ jobs: filtered });
  } catch (err) {
    res.status(500).json({ error: 'Drushim scrape failed' });
  }
}
