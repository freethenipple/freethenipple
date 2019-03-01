import { saveAs } from 'file-saver';

const getImage = url => {
  return new Promise(resolve => {
    const img = new global.Image();
    img.addEventListener('load', () => resolve(img));
    img.src = url;
  });
};

const saveImage = async (baseImgRef, file, img) => {
  if (!img) {
    return;
  }
  const { naturalWidth, naturalHeight, width, height } = baseImgRef;

  const bodyImage = await getImage(file);
  const addedImage = await getImage(img.url);

  const canvas = document.createElement('canvas');

  canvas.height = naturalHeight;
  canvas.width = naturalWidth;

  const ctx = canvas.getContext('2d');

  const leftPosition = (img.left / width) * naturalWidth;
  const topPosition = (img.top / height) * naturalHeight;

  const addedImageWidth = (img.width * naturalWidth) / width;
  const addedImageHeight = (img.height * naturalHeight) / height;

  ctx.drawImage(bodyImage, 0, 0);
  ctx.drawImage(
    addedImage,
    leftPosition,
    topPosition,
    addedImageWidth,
    addedImageHeight
  );

  const resultData = canvas.toDataURL('image/jpeg', 0.7);

  saveAs(resultData, 'final-image.jpeg');
};

export default saveImage;
