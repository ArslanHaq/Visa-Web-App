import { personalDetailsDto } from '@/dto/ApplicationData.dto';
import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import imageCompression from 'browser-image-compression';
import Image from 'next/image';
import { set } from 'animejs';

interface ImageUploadProps {
  setFormValues: Dispatch<SetStateAction<personalDetailsDto>> | any;
  formValues: personalDetailsDto | any;
  photographBase64: string;
  width?: string;
  height?: string;
  loading?: boolean;
  disabled?: boolean;
  setUpload?: Dispatch<SetStateAction<boolean>>;
}

function ImageUpload({
  setFormValues,
  formValues,
  photographBase64,
  width,
  height,
  loading,
  disabled,
  setUpload
}: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const [base64, setBase64] = useState<string | null>(null);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setUpload && setUpload(false);
    const file = event.target.files?.[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target) {
            const result = e.target.result as string;
            const mimeType = result.substring(
              result.indexOf(':') + 1,
              result.indexOf(';')
            );

            setImage(result);
            setBase64(result);
            setFormValues({
              ...formValues,
              photographBase64: result.replace(
                `data:${mimeType};base64,`,
                ''
              ),
            });
            setUpload && setUpload(true);
          }
        };

        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error compressing the image:', error);
      }
    }
  };

  useEffect(() => {
    const mimeType = photographBase64.charAt(0) === '/' ? 'image/jpeg' : 'image/png'; // Determine MIME type
    const prefix = `data:${mimeType};base64,`;
    setImage(photographBase64 ? prefix + photographBase64 : null);
  }, [photographBase64]);


  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="file-input"
        disabled={disabled}
      />
      <label htmlFor="file-input">
        {image ? (
          <div>
            <Image
              layout="responsive"
              src={image}
              alt="Uploaded Image"
              width={200}
              height={200}
              quality={100}
              style={{
                maxWidth: width ? width : '150px',
                minWidth: width ? width : '150px',
                maxHeight: height ? height : '150px',
                minHeight: height ? height : '150px',
              }}
              className="rounded-xl border-2 border-dashed border-logoColorBlue p-2"
            />
          </div>
        ) : (
          <div
            style={{
              width: width ? width : '120px',
              height: height ? height : '120px',
              border: '2px dashed #003366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: '#f9f9f9',
              fontSize: '14px',
              borderRadius: '10px',
            }}
          >
            <p className='text-base font-sans text-logoColorBlue font-semibold'>Click to select image</p>
          </div>
        )}
      </label>
    </div>
  );
}

export default ImageUpload;
