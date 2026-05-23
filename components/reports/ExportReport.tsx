import React from 'react';

export default function ExportReport() {
  const handleExportJSON = () => {
    const dummyData = {
      scanDate: new Date().toISOString(),
      target: "example.com",
      results: {
        ips: ["192.0.2.1"],
        subdomains: ["www.example.com", "mail.example.com"]
      }
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dummyData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "ghost_trace_report.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleExportPDF = () => {
    // In a real implementation, we would import jsPDF:
    // import { jsPDF } from "jspdf";
    // const doc = new jsPDF();
    // doc.text("GhostTrace Report", 10, 10);
    // doc.save("report.pdf");
    alert("jsPDF export triggered (needs jspdf package installed)");
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #333', background: '#0a0a0a', color: '#0f0', fontFamily: 'monospace', borderRadius: '5px' }}>
      <h3 style={{ marginTop: 0, textTransform: 'uppercase', color: '#0ff' }}>Export Report</h3>
      <p style={{ fontSize: '14px', color: '#888' }}>Download the current reconnaissance graph and data.</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={handleExportJSON}
          style={{ padding: '8px 16px', background: '#000', color: '#0f0', border: '1px solid #0f0', cursor: 'pointer', fontFamily: 'monospace' }}
        >
          Export JSON
        </button>
        <button 
          onClick={handleExportPDF}
          style={{ padding: '8px 16px', background: '#000', color: '#0ff', border: '1px solid #0ff', cursor: 'pointer', fontFamily: 'monospace' }}
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}
