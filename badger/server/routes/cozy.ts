//import opentype from 'opentype.js'
//import TextToSVG from "text-to-svg";

import TextToSVG from 'text-to-svg';

var textToSVG: TextToSVG;

if (process.env.NODE_ENV === 'development') {

  textToSVG = TextToSVG.loadSync("public/fonts/static/Inter-Medium.ttf"); 

} else {
  textToSVG = TextToSVG.loadSync("/fonts/static/Inter-Medium.ttf");
}

const textToSVGBold = TextToSVG.loadSync( 

  "./public/fonts/static/Inter-ExtraBold.ttf",
); 
export default defineEventHandler(async (event) => {
  
  try {

    //setHeader(event, 'Content-Type', 'image/svg+xml')
    const query = getQuery(event);
    const gradientStart = query.gradientStart;
    const gradientEnd = query.gradientEnd;
    const lineOne = query.lineOne ?? 'undefined';
    const lineTwo = query.lineTwo ?? 'undefined';
    const colorOne = query.colorOne ?? query.colourOne;
    const colorTwo = query.colorTwo ?? query.colourTwo;
    const iconUrl = query.iconUrl;

    //const bufferMedium = await useStorage('assets:server').getItem(`fonts/static/Inter-Medium.ttf`)
    //const bufferMedium = fetch('https://badger.worldwidepixel.ca/fonts/static/Inter-Medium.ttf').then(res => res.arrayBuffer());
    //const bufferExtraBold = await useStorage('assets:server').getItem(`fonts/static/Inter-ExtraBold.ttf`)
    //const bufferExtraBold = fetch('https://badger.worldwidepixel.ca/fonts/static/Inter-ExtraBold.ttf').then(res => res.arrayBuffer());

    //const mediumFont = opentype.parse(await bufferMedium)
    //return mediumFont
    //const extraBoldFont = opentype.parse(await bufferExtraBold)

    const attributesOne = { fill: `#${colorOne}` };
    const attributesTwo = { fill: `#${colorTwo}` };

    const optionsOne = {
      x: 64,
      y: 24.5,
      fontSize: 16,
      attributes: attributesOne,
    };
    const optionsTwo = {
      x: 64,
      y: 43.5,
      fontSize: 17,
      attributes: attributesTwo,
    };

    const svg = textToSVG.getPath(lineOne.toString(), optionsOne);
    const boldSvg = textToSVGBold.getPath(lineTwo.toString(), optionsTwo);

    const lineOneMetrics = textToSVG.getMetrics(lineOne.toString(), optionsOne);
    const lineTwoMetrics = textToSVG.getMetrics(lineTwo.toString(), optionsOne);

    const finalMetrics =
      lineOneMetrics.width + lineOneMetrics.x >=
        lineTwoMetrics.width + lineTwoMetrics.x
        ? lineOneMetrics
        : lineTwoMetrics;
    const width = (finalMetrics.width + finalMetrics.x) * 1.14;

    //console.log(svg)

    //const mediumPath = mediumFont.getPath(lineOne, 0, 0, 16)
    //const extraBoldPath = extraBoldFont.getPath(lineTwo, 0, 0, 17)

    //const lineOneSVG = mediumPath.toSVG()
    //const lineTwoSVG = extraBoldPath.toSVG()

    //console.log(await bufferMedium)

    var finalSvg = `<svg width="${width}" height="64" viewBox="0 0 ${width} 64" fill="none" xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <g filter="url(#DropShadow)">
      <rect x="4" width="${width - 10
      }" height="56" rx="8" fill="url(#BackgroundGradient)" />
      <rect x="5.05" y="1.05" width="${width - 12
      }" height="53.9" rx="6.95" stroke="white"
          stroke-opacity="0.15" stroke-width="2.1" />
      <g filter="url(#IconShadow)">
          <rect x="16" y="8" width="40" height="40" fill="url(#IconPattern)" />
      </g>
      <g filter="url(#TextShadow)">
          <!-- Generate these -->
          ${svg}
          ${boldSvg}
      </g>
  </g>
  <defs>
      <filter id="DropShadow" x="0" y="0" width="${width}" height="64" filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="DropShadowEffect" />
          <feBlend mode="normal" in="SourceGraphic" in2="DropShadowEffect" result="shape" />
      </filter>
      <filter id="IconShadow" x="10.2857" y="2.28571" width="51.4286" height="51.4286"
          filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="2.85714" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="DropShadowEffect" />
          <feBlend mode="normal" in="SourceGraphic" in2="DropShadowEffect" result="shape" />
      </filter>
      <pattern id="IconPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlink:href="#Icon" transform="scale(0.00195312)" />
      </pattern>
      <filter id="TextShadow" x="58.4" y="3.9" width="806.2" height="48.2"
          filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="2.8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="DropShadowEffect" />
          <feBlend mode="normal" in="SourceGraphic" in2="DropShadowEffect" result="shape" />
      </filter>
      <linearGradient id="BackgroundGradient" x1="77.5" y1="0" x2="77.5" y2="56"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#${gradientStart}" /> <!-- gradientStart -->
          <stop offset="1" stop-color="#${gradientEnd}" /> <!-- gradientEnd -->
      </linearGradient>
      <!-- Generate this tag in code -->
      <image id="Icon" width="512" height="512"
          xlink:href="${iconUrl}" />
  </defs>
</svg>`;

    return finalSvg;

  } catch {
    return Error;
  }

  /*return {
    "welcome": "hello",
    "start": gradientStart,
    "end": gradientEnd ,
    "one": lineOne ,
    "two": lineTwo,
    "colourOne": colourOne,
    "colourTwo": colourTwo,
    "icon": iconUrl,
    "svg": finalSvg
  }; */
});
