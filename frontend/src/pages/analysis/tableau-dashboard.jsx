import { useEffect } from 'react';

const TableauDashboard = () => {
  useEffect(() => {
    const initTableauViz = () => {
      const containerDiv = document.getElementById('tableauVizContainer');
      const options = {
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: () => {
          console.log('Tableau Viz is interactive');
        },
      };

      const vizUrl = 'https://public.tableau.com/views/DAS_record/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link';

      // Create the Tableau Viz
      // eslint-disable-next-line no-undef
      new tableau.Viz(containerDiv, vizUrl, options);
    };

    // Load the Tableau API script dynamically
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    script.onload = initTableauViz;

    document.body.appendChild(script);

    // Clean up the script tag when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div id="tableauVizContainer" style={{ width: '100%', height: '800px' }}>
      {/* This div will be the container for your Tableau dashboard */}
    </div>
  );
};

export default TableauDashboard;
