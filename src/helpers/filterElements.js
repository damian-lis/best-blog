const filterElements = (elements, target, search) => {
  return elements.filter((element) =>
    element[target].toLowerCase().includes(search.toLowerCase())
  );
};

export default filterElements;
