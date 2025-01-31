import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import '../styles/MemeGenerator.css';

function MemeGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState(memeTemplates[0]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const memeRef = useRef(null);

  const downloadImage = (dataUrl, filename) => {
    try {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  const handleDownload = async () => {
    if (!memeRef.current) {
      alert('Please wait for the meme template to load.');
      return;
    }

    try {
      setDownloading(true);
      const dataUrl = await toPng(memeRef.current, {
        quality: 0.95,
        backgroundColor: 'white',
        cacheBust: true,
        style: {
          transform: 'scale(1)',
        },
      });
      
      const timestamp = new Date().getTime();
      const filename = `meme-${timestamp}.png`;
      
      downloadImage(dataUrl, filename);
    } catch (error) {
      console.error('Error generating meme:', error);
      alert('Failed to generate meme. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    console.error('Failed to load image:', selectedTemplate.url);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div className="meme-generator">
      <h1>Create Your Meme</h1>
      
      <div className="meme-controls">
        <select 
          onChange={(e) => {
            setSelectedTemplate(memeTemplates[e.target.value]);
            setImageError(false);
          }}
          className="template-select"
          value={memeTemplates.indexOf(selectedTemplate)}
          title="Select a meme template"
        >
          <option value="" disabled>Select a meme template</option>
          {memeTemplates.map((template, index) => (
            <option key={index} value={index}>
              {template.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Top Text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
          maxLength="50"
        />

        <input
          type="text"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
          maxLength="50"
        />

        <button 
          onClick={handleDownload} 
          disabled={downloading || imageError}
          className={downloading ? 'downloading' : ''}
        >
          {downloading ? 'Downloading...' : 'Download Meme'}
        </button>
      </div>

      <div className="meme-preview" id="meme" ref={memeRef}>
        {imageError ? (
          <div className="error-message">
            Failed to load image. Please try another template.
          </div>
        ) : (
          <>
            {topText && <div className="meme-text top">{topText}</div>}
            <img 
              src={selectedTemplate.url} 
              alt={selectedTemplate.name}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            {bottomText && <div className="meme-text bottom">{bottomText}</div>}
          </>
        )}
      </div>
    </div>
  );
}

const memeTemplates = [
  {
    name: "Drake Hotline Bling",
    url: "https://i.imgflip.com/30b1gx.jpg"
  },
  {
    name: "Two Buttons",
    url: "https://i.imgflip.com/1g8my4.jpg"
  },
  {
    name: "Distracted Boyfriend",
    url: "https://i.imgflip.com/1ur9b0.jpg"
  },
  {
    name: "Running Away Balloon",
    url: "https://i.imgflip.com/261o3j.jpg"
  },
  {
    name: "Expanding Brain",
    url: "https://i.imgflip.com/1jwhww.jpg"
  },
  {
    name: "One Does Not Simply",
    url: "https://i.imgflip.com/1bij.jpg"
  },
  {
    name: "Woman Yelling At Cat",
    url: "https://i.imgflip.com/345v97.jpg"
  },
  {
    name: "Change My Mind",
    url: "https://i.imgflip.com/24y43o.jpg"
  },
  {
    name: "This Is Fine",
    url: "https://i.imgflip.com/wxica.jpg"
  },
  {
    name: "Surprised Pikachu",
    url: "https://i.imgflip.com/2kbn1e.jpg"
  },
  {
    name: "Roll Safe Think About It",
    url: "https://i.imgflip.com/1h7in3.jpg"
  },
  {
    name: "Waiting Skeleton",
    url: "https://i.imgflip.com/2fm6x.jpg"
  }
];

export default MemeGenerator;