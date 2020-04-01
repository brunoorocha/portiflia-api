
export const getImageUrl = (req: any, imageName: string): string => {
  const { host } = req.headers;
  const { protocol } = req;
  return `${protocol}://${host}/images/${imageName}`;
}
