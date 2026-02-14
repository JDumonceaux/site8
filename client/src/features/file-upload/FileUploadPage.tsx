import { type ChangeEvent, type JSX, useCallback, useState } from 'react';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import Layout from '@features/layouts/layout/Layout';
import { apiClient } from '@lib/api';

type UploadStatus = 'error' | 'idle' | 'success' | 'uploading';

const FileUploadPage = (): JSX.Element => {
  const title = 'File Upload';

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = useCallback(async () => {
    if (!file) return;

    setStatus('uploading');
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await apiClient.post('https://httpbin.org/post', formData);

      setStatus('success');
      setUploadProgress(100);
    } catch {
      setStatus('error');
      setUploadProgress(0);
    }
  }, [file]);

  const handleUploadClick = useCallback(() => {
    void handleFileUpload();
  }, [handleFileUpload]);

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <PageTitle title={title} />
        <section>
          <input
            onChange={handleFileChange}
            type="file"
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
              onClick={handleUploadClick}
              type="button"
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
