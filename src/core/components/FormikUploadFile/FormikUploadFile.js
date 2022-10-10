import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import Pica from 'pica';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Theme from '../../theme';
import FileUploadPreviewComponent from '../FormikUploadPreviewComponent';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    textError: {
      color: theme.colors.semanticError,
    },
  };
  return styles;
};

const FormikUploadFile = ({
  label,
  field: { name, value },
  form: { errors, setFieldValue },
  required,
  helperText,
}) => {
  const styles = useStyles();
  const pica = Pica();
  const [errorImageResolution, setErrorImageResolution] = useState(false);

  const getImage = (file) => {
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    const { preview: imagePreview } = file;

    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve({ image, preview: imagePreview });
      };
      image.onerror = (err) => {
        reject(err);
      };
      image.src = imagePreview;
    });
  };

  const resizeImageFiles = (imageFiles, maxSize = 1366) => {
    setErrorImageResolution(false);
    return new Promise(async (resolve, reject) => {
      const resizedImageFiles = [];
      const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      for (let i = 0; i < imageFiles.length; i += 1) {
        const file = imageFiles[i];

        if (!(file instanceof File)) {
          resizedImageFiles.push(file);
        }

        if (file instanceof File && !acceptedImageTypes.includes(file.type)) {
          resizedImageFiles.push(file);
        }

        let image;
        let preview;
        try {
          ({ image, preview } = await getImage(file));
        } catch (getImageErr) {
          reject(getImageErr);
        }

        const canvas = document.createElement('canvas');
        let imageWidth = image.width;
        let imageHeight = image.height;

        if (imageWidth > imageHeight) {
          if (imageWidth > maxSize) {
            imageHeight *= maxSize / imageWidth;
            imageWidth = maxSize;
          }
        } else if (imageHeight > maxSize) {
          imageWidth *= maxSize / imageHeight;
          imageHeight = maxSize;
        }

        canvas.width = parseInt(imageWidth, 10);
        canvas.height = parseInt(imageHeight, 10);

        let picaResult = null;
        let picaResizedFile = null;

        try {
          picaResult = await pica.resize(image, canvas, {
            unsharpAmount: 80,
            unsharpRadius: 0.6,
            unsharpThreshold: 2,
            alpha: true,
          });

          const resizedBlob = await pica.toBlob(picaResult, file.type, 0.9);
          picaResizedFile = new File([resizedBlob], file.name, {
            type: file.type,
          });
          picaResizedFile.preview = preview;
          resizedImageFiles.push(picaResizedFile);
        } catch (picaErr) {
          reject(picaErr);
        }
      }
      resolve(resizedImageFiles);
    });
  };

  const rotateBase64Image90Degree = (file) => () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.src = file.preview;
    image.onload = () => {
      canvas.width = image.height;
      canvas.height = image.width;
      ctx.rotate((90 * Math.PI) / 180);
      ctx.translate(0, -canvas.width);
      ctx.drawImage(image, 0, 0);

      const preview = canvas.toDataURL();

      canvas.toBlob(
        async (blob) => {
          const newRotatedFile = new File([blob], file.name, {
            type: file.type,
          });

          newRotatedFile.preview = preview;

          const [resizedRotatedImage] = await resizeImageFiles([
            newRotatedFile,
          ]);

          const newFilesArray = value.map((data) => {
            if (data.name === file.name) {
              return resizedRotatedImage;
            }
            return data;
          });

          setFieldValue(name, newFilesArray);
        },
        file.type,
        1
      );
    };
  };

  const onImageRemove = (image) => () => {
    let newFilesArray = [];

    if (image instanceof File) {
      newFilesArray = value.filter((file) => file.preview !== image.preview);
    }

    if (typeof image === 'string') {
      newFilesArray = '';
    }
    return setFieldValue(name, newFilesArray);
  };

  const getPreviewUrl = (input) => {
    if (input instanceof File) {
      return input.preview;
    }

    return input;
  };

  const isImageUploaded = (input) => {
    return !(input instanceof File);
  };

  const isError = !!errors && !!errors[name];

  let updateLabel = label;
  if (!required) {
    updateLabel = `${label} (optional)`;
  }

  const isValidImageResolutions = (image) => {
    if (image.width >= 0 && image.height >= 0) {
      return true;
    }

    return false;
  };

  const isValidImages = async (imageFiles) => {
    const promiseImages = [];
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    for (let i = 0; i < imageFiles.length; i += 1) {
      const file = imageFiles[i];
      if (file instanceof File && !acceptedImageTypes.includes(file.type)) {
        continue;
      }

      promiseImages.push(getImage(file));
    }

    const arrImages = await Promise.all(promiseImages);
    const invalidImage = arrImages.find((data) => {
      return !isValidImageResolutions(data.image);
    });

    return invalidImage ? false : true;
  };

  const renderImagePreview = () => {
    if (value && value.length > 0) {
      const image = value[0];
      return (
        <FileUploadPreviewComponent
          value={image}
          imagePath={getPreviewUrl(image)}
          isUploadSuccess={isImageUploaded(image)}
          onImageRemove={onImageRemove(image)}
          onImageRotateClockWise={rotateBase64Image90Degree(image)}
        />
      );
    }
  };

  const renderDropZone = () => {
    return (
      <Dropzone
        onDropAccepted={async (acceptedFiles) => {
          const isValidImageResolution = await isValidImages(acceptedFiles);
          if (!isValidImageResolution) {
            setErrorImageResolution(true);
            return setFieldValue(name, []);
          }

          const resizedFiles = await resizeImageFiles(acceptedFiles);
          return setFieldValue(name, resizedFiles);
        }}
        accept='image/*'
      >
        {({ getRootProps }) => {
          return (
            <Box {...getRootProps()}>
              {value && value.length > 0 ? null : (
                <Card>
                  <CardContent>
                    <Typography align='center'>Drop File Here</Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          );
        }}
      </Dropzone>
    );
  };

  const renderMessage = () => {
    let message = '';
    if (errorImageResolution) {
      message = 'Please Check Your image Resolution';
    } else if (isError) {
      message = errors[name];
    }

    return (
      <Typography variant='subtitle2' sx={styles.textError}>
        {message}
      </Typography>
    );
  };

  return (
    <Box>
      <Typography variant='subtitle1'>{updateLabel}</Typography>
      <Typography variant='subtitle2'>{helperText}</Typography>
      <Grid container direction='row' justify='flex-start' alignItems='center'>
        <Grid item>{renderImagePreview()}</Grid>
        <Grid item>
          {renderDropZone()}
          {renderMessage()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormikUploadFile;
