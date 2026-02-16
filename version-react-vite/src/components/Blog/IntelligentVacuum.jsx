import React from "react";
import BlogPost from "./BlogPost.jsx";
import isoImg from "../../Assets/Screenshot 2025-07-16 232639.png";
import ceImg from "../../Assets/Screenshot 2025-07-16 232844.png";
import topBrandImg from "../../Assets/Screenshot 2025-07-16 232725.png";

function IntelligentVacuum() {
  const content = (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <a href="https://www.youtube.com/watch?v=V4jgwg8rnOg" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://img.youtube.com/vi/V4jgwg8rnOg/maxresdefault.jpg" 
            alt="IIMT-CL-W Presentation" 
            style={{ width: '100%', maxWidth: '800px', borderRadius: '10px' }}
          />
        </a>
        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>Click to watch the product introduction video!</p>
      </div>

      <p>
        The <strong>IIMT-CL-W</strong> is the leading industrial robotic vacuum designed for demanding commercial environments. This 3-in-1 cleaning system delivers sweeping, vacuuming, and mopping capabilities with autonomous navigation and smart scheduling. Automate your facility cleaning with LiDAR navigation, 5,000 Pa suction, and a 6-hour runtime.
      </p>

      <h2 className="purple">🌟 Key Features</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', margin: '20px 0' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 className="purple">3-in-1 System</h3>
          <p>Sweep, vacuum, and mop in a single pass for maximum efficiency.</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 className="purple">Smart Navigation</h3>
          <p>Utilizes LiDAR and Visual SLAM for precise mapping and obstacle avoidance (±2 cm accuracy).</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 className="purple">Self-Charging</h3>
          <p>Automatically returns to base for continuous 24/7 operation with 2.5h charging time.</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 className="purple">Remote Control</h3>
          <p>Monitor and schedule cleaning tasks from anywhere via mobile or web interface.</p>
        </div>
      </div>

      <h2 className="purple">🏢 Industrial Applications</h2>
      <p>The IIMT-CL-W is designed to meet the unique cleaning challenges of various industrial settings:</p>
      <ul>
        <li><strong>Warehouses:</strong> Large area coverage with superior dust control and debris management.</li>
        <li><strong>Manufacturing:</strong> Continuous operation for busy production floors with heavy-duty cleaning.</li>
        <li><strong>Distribution Centers:</strong> High-traffic area maintenance with scheduled off-peak cleaning.</li>
        <li><strong>Hospitals:</strong> HEPA filtration for infection control and quiet operation in sensitive areas.</li>
        <li><strong>Airports:</strong> Minimal disruption cleaning in high-security areas.</li>
      </ul>

      <h2 className="purple">⚙️ Technical Specifications</h2>
      <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}>
              <th style={{ textAlign: 'left', padding: '12px' }}>Category</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Specification</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <td style={{ padding: '12px' }}>Performance</td>
              <td style={{ padding: '12px' }}>Suction Power</td>
              <td style={{ padding: '12px' }}>5,000 Pa</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <td style={{ padding: '12px' }}>Performance</td>
              <td style={{ padding: '12px' }}>Cleaning Width</td>
              <td style={{ padding: '12px' }}>60 cm</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <td style={{ padding: '12px' }}>Capacity</td>
              <td style={{ padding: '12px' }}>Dust Bin / Water Tank</td>
              <td style={{ padding: '12px' }}>8 L / 4.5 L</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <td style={{ padding: '12px' }}>Navigation</td>
              <td style={{ padding: '12px' }}>System</td>
              <td style={{ padding: '12px' }}>LiDAR + Visual SLAM</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <td style={{ padding: '12px' }}>Battery</td>
              <td style={{ padding: '12px' }}>Runtime / Charging</td>
              <td style={{ padding: '12px' }}>6 Hours / 2.5 Hours</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="purple">📈 Case Studies & Results</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 400px', background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
          <h3 style={{ color: '#22c55e' }}>Global Logistics Firm</h3>
          <p><strong>Result:</strong> 45% reduction in cleaning costs and 80% improvement in consistency.</p>
          <p>Deployment of 12 units across 1.2M sq ft achieved ROI in just 14 months.</p>
        </div>
        <div style={{ flex: '1 1 400px', background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
          <h3 style={{ color: '#22c55e' }}>Auto Parts Manufacturer</h3>
          <p><strong>Result:</strong> 75% cleanliness improvement and 30% reduction in production defects.</p>
          <p>Annual savings reached $220K with an ROI achieved in 16 months.</p>
        </div>
      </div>

      <h2 className="purple">🛡 Certification & Trust</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', margin: '30px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <img src={isoImg} alt="ISO 9001" style={{ height: '100px', objectFit: 'contain' }} />
          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>ISO 9001 Certified</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src={ceImg} alt="CE Mark" style={{ height: '100px', objectFit: 'contain' }} />
          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>CE Certified</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src={topBrandImg} alt="Top Brand" style={{ height: '100px', objectFit: 'contain' }} />
          <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Top Brand 2023</p>
        </div>
      </div>

      <h2 className="purple">❓ Frequently Asked Questions</h2>
      <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '10px' }}>
        <p><strong>Q: How does it work in large facilities?</strong></p>
        <p style={{ color: '#ccc' }}>A: It uses LiDAR to map up to 50,000 sq ft per charge, dividing space into zones for systematic cleaning.</p>
        <p><strong>Q: What is the ROI?</strong></p>
        <p style={{ color: '#ccc' }}>A: Most facilities see ROI within 12-18 months through 30-50% labor cost reductions.</p>
        <p><strong>Q: Can it handle different floor types?</strong></p>
        <p style={{ color: '#ccc' }}>A: Yes, it transitions seamlessly between concrete, epoxy, tile, and low-pile carpet.</p>
      </div>

      <p style={{ textAlign: 'center', marginTop: '40px' }}>
        <em>Transform your facility cleaning with intelligent automation. Stop paying for inconsistent manual labor and embrace the future.</em>
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Intelligent Vacuum project: IIMT-CL-V Industrial Robotic Vacuum"
      subtitle="Automated industrial cleaning with advanced robotic technology"
      author="Ron-tino"
      date="July 15, 2025"
      content={content}
    />
  );
}

export default IntelligentVacuum;
