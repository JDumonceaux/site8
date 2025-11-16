import { type ChangeEvent, type JSX, useState } from 'react';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page-title/PageTitle';
import Layout from '@features/layouts/Layout/Layout';
import axios from 'axios';

type UploadStatus = 'error' | 'idle' | 'success' | 'uploading';

const FileUploadPage = (): JSX.Element => {
  const title = 'File Upload';

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (error: ChangeEvent<HTMLInputElement>) => {
    if (error.target.files) {
      setFile(error.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
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
  };

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <PageTitle title={title} />
        <section>
          <input
            type="file"
            onChange={handleFileChange}
          />
          {file ? (
            <div>
              <div>
                File name:
                {file.name}
              </div>
              <div>
                Size:
                {file.size}
              </div>
            </div>
          ) : null}
          {file && status !== 'uploading' ? (
            <button
              type="button"
              onClick={() => {
                void handleFileUpload();
              }}
            >
              Upload
            </button>
          ) : null}
          {status === 'success' ? <div>Success</div> : null}
          {status === 'error' ? <div>Error</div> : null}
          <div>
            Progress:
            {uploadProgress}
          </div>
        </section>
      </Layout.Main>
    </>
  );
};

export default FileUploadPage;
