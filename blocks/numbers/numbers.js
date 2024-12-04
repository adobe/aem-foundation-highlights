import ffetch from '../../scripts/ffetch.js';

async function buildStatisticsSummary() {
  const result = await ffetch('/query-index.json').sheet("numbers").all();
  const statisticsByTopic = new Map();

  // Group items by topic
  result.forEach((item) => {
    const topic = item.topic;
    if (!statisticsByTopic.has(topic)) {
      statisticsByTopic.set(topic, []);
    }
    statisticsByTopic.get(topic).push(item);
  });

  return statisticsByTopic;
}

async function renderStatisticsFlex() {
  const statisticsByTopic = await buildStatisticsSummary();
  let mjml = `<mj-section padding="20px" background-color="#ffffff">`;

  statisticsByTopic.forEach((items, topic) => {
    console.log(items);
    const mjmlItems = items.map(({ title, numbers, description, icon }) => `
      <mj-column padding-bottom="40px" padding="0 20px" mj-class="statistics-item">
        <mj-image width="50px" src="${icon}" alt="${title}" mj-class="statistics-icon" />
        <mj-text font-size="16px" font-weight="bold" align="center" mj-class="statistics-title">${title}</mj-text>
        <mj-text font-size="14px" color="green" font-weight="bold" align="center" mj-class="statistics-numbers">${numbers}</mj-text>
        <mj-text font-size="14px" align="center" mj-class="statistics-description">${description}</mj-text>
      </mj-column>
    `).join("");

    mjml += `
      <mj-section mj-class="statistics-topic">
        <mj-column>
          <mj-text align="center" padding-bottom="20px" font-size="20px" font-weight="bold" mj-class="statistics-topic-title">${topic}</mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        ${mjmlItems}
      </mj-section>`;
  });

  mjml += `</mj-section>`;
  return mjml;
}

export default function decorate() {
  return renderStatisticsFlex();
}
