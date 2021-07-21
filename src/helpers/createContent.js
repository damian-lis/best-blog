const createContent = (example) => {
  const sections = [];

  for (let i = 0; i < 3; i++) {
    const section = {};

    section.headline = `${i + 1} Sekcja`;
    section.paragraphs = [];

    for (let i = 0; i < 3; i++) {
      section.paragraphs.push(example);
    }

    sections.push(section);
  }

  return sections;
};

export default createContent;
