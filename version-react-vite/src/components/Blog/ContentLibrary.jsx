import React from "react";
import BlogPost from "./BlogPost.jsx";
import catalogPreviewImg from "../../Assets/catalog_preview.png";

function ContentLibrary() {
  const content = (
    <div>
      <p>
        Building a digital home for content creators involves more than just listing videos. For this project, I implemented a robust <strong>Content Library</strong> for the "African Politics Channel," integrating it with their e-commerce ecosystem.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={catalogPreviewImg} 
          alt="Content Library Preview" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        />
      </div>

      <h2 className="purple">🚀 Project Goals</h2>
      <ul>
        <li><strong>YouTube Integration:</strong> Showcasing a curated catalog of videos from their channel.</li>
        <li><strong>E-commerce Synergy:</strong> Linking specific content to merchandise and products on their Shopify store.</li>
        <li><strong>User Experience:</strong> Creating a clean, responsive interface for navigating a large volume of political and historical commentary.</li>
      </ul>

      <h2 className="purple">🏷️ Content Categorization</h2>
      <p>The core of the user experience is the ability to filter through hundreds of hours of content. I implemented a dynamic category system:</p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '20px 0' }}>
        {['African Politics', 'International Politics', 'History', 'Featured'].map(cat => (
          <span key={cat} style={{ padding: '5px 15px', borderRadius: '20px', border: '1px solid #c770fe', color: '#c770fe', fontSize: '0.9rem' }}>
            {cat}
          </span>
        ))}
      </div>

      <h2 className="purple">📺 The Video Catalog</h2>
      <p>
        The implementation features a grid-based catalog with hover states and direct links to either the video player or the associated shop item.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', margin: '30px 0' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ height: '120px', background: `rgba(199, 112, 254, ${0.1 * i})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2rem' }}>🎬</span>
            </div>
            <div style={{ padding: '10px' }}>
              <div style={{ height: '10px', width: '80%', background: 'rgba(255,255,255,0.2)', marginBottom: '5px' }}></div>
              <div style={{ height: '10px', width: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="purple">✨ Key Technical Features</h2>
      <ul>
        <li><strong>Responsive Video Backgrounds:</strong> A modern, cinematic welcome experience.</li>
        <li><strong>Direct CMS/Shopify Integration:</strong> seamless bridge between content and commerce.</li>
        <li><strong>Vite-Optimized Assets:</strong> Fast loading times even with large image/video sets.</li>
      </ul>

      <h2 className="purple">🎯 Final Impact</h2>
      <p>
        This solution provides a seamless bridge between content consumption and product discovery, helping the client monetize their audience more effectively while providing a professional, centralized hub for their work.
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Content Library Website with E-commerce Integration"
      subtitle="A professional video catalog and shop integration for content creators."
      author="Ron-tino"
      date="November 2024"
      content={content}
    />
  );
}

export default ContentLibrary;
