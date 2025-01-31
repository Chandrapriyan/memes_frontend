import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const features = [
    {
      title: 'Popular Meme Templates',
      description: 'Access a wide variety of trending meme templates',
      icon: '🖼️'
    },
    {
      title: 'Easy Customization',
      description: 'Add custom text to top and bottom of memes',
      icon: '✏️'
    },
    {
      title: 'Quick Download',
      description: 'Download your memes instantly in high quality',
      icon: '⚡'
    },
    {
      title: 'User Gallery',
      description: 'Save and manage your created memes',
      icon: '🎨'
    }
  ];

  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Create Amazing Memes</h1>
        <p className="hero-subtitle">The easiest way to create, customize, and share memes</p>
        <button className="cta-button" onClick={handleSignUpClick}>
          Get Started - It's Free!
        </button>
      </header>

      <section className="features-section">
        <h2>Why Choose Our Meme Generator?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" onClick={handleSignUpClick}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="templates-preview">
        <h2>Popular Templates</h2>
        <div className="templates-grid">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="template-card" onClick={handleSignUpClick}>
              <img 
                src={`https://i.imgflip.com/${['30b1gx', '1g8my4', '1ur9b0', '261o3j'][index]}.jpg`}
                alt={`Meme template ${index + 1}`}
              />
              <div className="template-overlay">
                <span>Create Now</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Create Your First Meme?</h2>
        <p>Join thousands of creators and start making memes today!</p>
        <button className="cta-button" onClick={handleSignUpClick}>
          Sign Up Now
        </button>
      </section>
    </div>
  );
}

export default HomePage;
