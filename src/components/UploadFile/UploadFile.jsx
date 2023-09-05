
import { useDropzone } from 'react-dropzone';
import styles from './UploadFile.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import altImage from './altImage.png';
import { IconButton } from '@mui/material';
import { useEffect, useRef } from 'react';
import imgByBlobFile from './imgByBlobFile';


const UploadFile = ({ watch, setValue, errors }) => {
  const imgRef = useRef(null);
  const media = watch('media') || [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files) => {
      try {
        setValue('media', files[0], { shouldValidate: true });
      } catch (error) {
        console.warn(error);
        alert('Ошибка при загрузке изображения');
      }
    },
    multiple: false,
  });

  const handleDeleteImg = () => {
    setValue(
      'media',
      null,
      { shouldValidate: true },
    );
  }

  useEffect(() => {
    if (!Array.isArray(media)) {
      (async () => {
        const imageUrl = await imgByBlobFile(media)
        imgRef.current.src = imageUrl
      })()
    } else if (!media.length) {
      imgRef.current.src = altImage
    }
  }, [media])

  return (
    <div className={styles.uploadFiles}>
      <section style={{ width: '100%' }} >
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Кликните сюда или перетащите изображение</p>
        </div>
        <div className={styles.img}>
          <img ref={imgRef} alt={altImage} src={altImage} />
          <div className={styles.close_icon}>
            {media.path && <IconButton onClick={handleDeleteImg}>
              <HighlightOffIcon />
            </IconButton>}
          </div>
        </div>
        <p style={{ color: 'red' }}>{errors?.media?.message}</p>
      </section>
    </div>
  )
}

export default UploadFile;