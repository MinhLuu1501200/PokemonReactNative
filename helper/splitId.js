export default getIdFromUrl = url => {
  const id = url.split('/')[url.split('/').length - 2];
  return id;
};
