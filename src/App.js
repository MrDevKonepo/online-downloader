import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleDownload = async () => {
    try {
      //const response = await axios.post('/download', {url: videoUrl });
      const response = await axios.post(`http://localhost:5000/download`, { url: videoUrl });
      setDownloadLink(response.data);
    } catch (error) {
      console.error('Error downloading video:', error);
      setDownloadLink('');
    }
  };

  return (
    <div className="App">
      <h1>Video Downloader</h1>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter the page link"
      />
      <button onClick={handleDownload}>Download Video</button>
      {downloadLink && (
        <div>
          <h2>Download link:</h2>
          <a href={downloadLink} download>
            Video download
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
