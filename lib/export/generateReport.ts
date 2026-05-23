import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportPDF = (target: string, type: string, results: any, threatScore: number) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text(`GhostTrace Intelligence Report: ${target}`, 14, 22);
  
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleString()}`, 14, 32);
  doc.text(`Target Type: ${type.toUpperCase()}`, 14, 40);
  doc.text(`Threat Score: ${threatScore}/100`, 14, 48);

  let startY = 60;

  // Example generic table generation
  if (results) {
    Object.keys(results).forEach((key) => {
      const sectionData = results[key];
      
      if (Array.isArray(sectionData) && sectionData.length > 0) {
        doc.setFontSize(14);
        doc.text(key.toUpperCase(), 14, startY);
        
        const head = Object.keys(sectionData[0]).map(k => k.toUpperCase());
        const body = sectionData.map(item => Object.values(item).map(v => String(v)));
        
        autoTable(doc, {
          startY: startY + 5,
          head: [head],
          body: body,
          theme: 'grid',
          styles: { fontSize: 8 },
          headStyles: { fillColor: [0, 255, 204] }, // GhostTrace Cyan
        });
        
        startY = (doc as any).lastAutoTable.finalY + 15;
      }
    });
  }

  doc.save(`GhostTrace_Report_${target}_${new Date().getTime()}.pdf`);
};

export const exportJSON = (target: string, results: any) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `GhostTrace_Report_${target}.json`);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const exportMarkdown = (target: string, type: string, results: any, threatScore: number) => {
  let md = `# GhostTrace Intelligence Report\n\n`;
  md += `**Target:** ${target}\n`;
  md += `**Type:** ${type}\n`;
  md += `**Date:** ${new Date().toLocaleString()}\n`;
  md += `**Threat Score:** ${threatScore}/100\n\n`;

  if (results) {
    Object.keys(results).forEach((key) => {
      md += `## ${key.toUpperCase()}\n`;
      const sectionData = results[key];
      if (Array.isArray(sectionData) && sectionData.length > 0) {
        const headers = Object.keys(sectionData[0]);
        md += `| ${headers.join(' | ')} |\n`;
        md += `| ${headers.map(() => '---').join(' | ')} |\n`;
        sectionData.forEach(item => {
          md += `| ${Object.values(item).join(' | ')} |\n`;
        });
        md += '\n';
      } else if (typeof sectionData === 'object') {
        md += "```json\n" + JSON.stringify(sectionData, null, 2) + "\n```\n\n";
      } else {
        md += `${sectionData}\n\n`;
      }
    });
  }

  const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(md);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `GhostTrace_Report_${target}.md`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
