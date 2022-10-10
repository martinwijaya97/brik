/* eslint-disable react/prop-types */
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ClearIcon from '@mui/icons-material/Clear';

const useStyles = () => {
  const styles = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 1,
    },
    image: {
      display: 'block',
      width: 300,
      height: 'auto',
    },
    text: {
      textAlign: 'center',
      maxWidth: 200,
    },
  };
  return styles;
};

const FileUploadPreviewComponent = ({
  value,
  isDisabled,
  imagePath,
  onImageRemove,
  onImageRotateClockWise,
}) => {
  const styles = useStyles();

  const renderText = () => {
    let text = '';
    if (value?.url) {
      const urlSplit = value?.url.split('/');
      const lastIndex = urlSplit.length - 1;
      text = urlSplit[lastIndex];
    } else if (value?.name) {
      text = value?.name;
    } else {
      text = '';
    }

    return <Typography sx={styles.text}>{text}</Typography>;
  };

  const renderImage = () => {
    return <img style={styles.image} src={imagePath} alt={imagePath} />;
  };

  const renderButtonClear = () => {
    return (
      <Button
        size='small'
        color='primary'
        onClick={onImageRemove}
        classes={{ label: styles?.label }}
        disabled={isDisabled}
      >
        <ClearIcon />
      </Button>
    );
  };

  const renderButtonRotate = () => {
    <Button size='small' color='primary' onClick={onImageRotateClockWise}>
      <RotateRightIcon />
    </Button>;
  };

  return (
    <Card sx={styles.root}>
      {renderImage()}
      {renderText()}
      <CardActions>
        {renderButtonClear()}
        {renderButtonRotate()}
      </CardActions>
    </Card>
  );
};

export default FileUploadPreviewComponent;
