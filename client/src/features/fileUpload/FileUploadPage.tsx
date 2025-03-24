import { useCallback, useState } from 'react';

import axios from 'axios';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'features/layouts/Layout/Layout';

type UploadStatus = 'error' | 'idle' | 'success' | 'uploading';

const FileUploadPage = (): React.JSX.Element => {
  const title = 'File Upload';

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    },
    [],
  );

  const handleFileUpload = useCallback(async () => {
    if (!file) return;

    setStatus('uploading');
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('https://httpbin.org/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      setStatus('success');
      setUploadProgress(100);
    } catch {
      setStatus('error');
      setUploadProgress(0);
    }
  }, [file]);

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <PageTitle title={title} />
        <section>
          <input onChange={handleFileChange} type="file" />
          {file ? (
            <div>
              <div>File name: {file.name}</div>
              <div>Size: {file.size}</div>
            </div>
          ) : null}
          {file && status !== 'uploading' ? (
            <button onClick={handleFileUpload} type="button">
              Upload
            </button>
          ) : null}
          {status === 'success' && <div>Success</div>}
          {status === 'error' && <div>Error</div>}
          <div>Progress: {uploadProgress}</div>
        </section>
      </Layout.Main>
    </>
  );
};

export default FileUploadPage;
