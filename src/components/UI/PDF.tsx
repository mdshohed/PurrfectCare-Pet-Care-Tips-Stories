import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const FeedingChart = () => {
  const chartRef = useRef(null);

  const generatePDF = async () => {
    const element = chartRef.current ;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgWidth = 190; // Set width of the image in mm
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add the image to the PDF
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('feeding-chart.pdf');
  };

  return (
    <div>
      <div ref={chartRef} style={{ padding: '20px', backgroundColor: '#e0f7fa' }}>
        <h1 style={{ textAlign: 'center' }}>Recommended Daily Feeding Chart for Adult Dogs</h1>
        <h3 style={{ textAlign: 'center' }}>Use a Standard 8 oz Measuring Cup</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
          <div>
            <h4>Toy</h4>
            <table border={1} style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th>Dog Weight</th>
                  <th>Cups per Day</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>3 lbs.</td><td>½ cup (139 calories)</td></tr>
                <tr><td>6 lbs.</td><td>½ cup (233 calories)</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4>Medium</h4>
            <table border={1} style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th>Dog Weight</th>
                  <th>Cups per Day</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>30 lbs.</td><td>1 ½ cups (781 calories)</td></tr>
                <tr><td>40 lbs.</td><td>2 ¾ cups (969 calories)</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4>Large</h4>
            <table border={1} style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th>Dog Weight</th>
                  <th>Cups per Day</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>70 lbs.</td><td>3 ¾ cups (1474 calories)</td></tr>
                <tr><td>80 lbs.</td><td>4 cups (1629 calories)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <p style={{ textAlign: 'center' }}>
          The data in this chart provides general feeding guidelines for domestic dogs. Please consult your veterinarian for breed-specific nutritional guidance.
        </p>
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default FeedingChart;
