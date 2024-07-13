
onmessage = function(event) {
    const { svgData } = event.data;
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
    postMessage(svgDoc.documentElement.outerHTML);
  };
  