import React, { useState } from 'react';

export default function DorkBuilder() {
  const [domain, setDomain] = useState('');

  const dorks = [
    { title: 'Directory Listing', query: `site:${domain} intitle:index.of` },
    { title: 'Configuration Files', query: `site:${domain} ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:ini` },
    { title: 'Database Files', query: `site:${domain} ext:sql | ext:dbf | ext:mdb` },
    { title: 'Log Files', query: `site:${domain} ext:log` },
    { title: 'Backup and Old Files', query: `site:${domain} ext:bkf | ext:bkp | ext:bak | ext:old | ext:backup` },
    { title: 'Login Pages', query: `site:${domain} inurl:login | inurl:signin | intitle:Login | intitle:"sign in" | inurl:auth` }
  ];

  return (
    <div style={{ padding: '20px', border: '1px solid #333', background: '#0a0a0a', color: '#0f0', fontFamily: 'monospace', borderRadius: '5px' }}>
      <h3 style={{ marginTop: 0, textTransform: 'uppercase', color: '#f0f' }}>Google Dork Builder</h3>
      <p style={{ fontSize: '14px', color: '#888' }}>Generate Google Dorks for targeted reconnaissance.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Enter target domain (e.g. example.com)" 
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          style={{ padding: '10px', width: '100%', boxSizing: 'border-box', background: '#000', color: '#0f0', border: '1px solid #0f0', fontFamily: 'monospace', outline: 'none' }}
        />
      </div>

      {domain && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          {dorks.map((dork, idx) => (
            <div key={idx} style={{ padding: '10px', border: '1px dashed #444', background: '#111' }}>
              <div style={{ fontWeight: 'bold', color: '#0ff', marginBottom: '5px' }}>{dork.title}</div>
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(dork.query)}`} 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#0f0', textDecoration: 'none', wordBreak: 'break-all' }}
              >
                {dork.query}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
