<template>
	<div class="flex flex-col">
		<NavBar />

		<main class="relative flex min-h-[95vh] w-full flex-1">
			<div class="flex w-full flex-col items-center justify-center gap-4 p-6">
				<span> {{ errorSplash }} </span>
				<span
					class="flex select-none flex-row items-center gap-0 text-9xl font-extrabold [&>svg]:h-28 [&>svg]:w-28"
					v-html="errorCode" />
				<span>{{ error.message }}</span>
			</div>
		</main>

		<footer
			class="bg-badger-background-secondary flex flex-col justify-center gap-6 border-t p-4 py-8 text-sm sm:flex-row sm:items-center">
			<div class="mt-[-1.25rem] flex flex-col items-center gap-1 sm:items-start">
				<NuxtLink to="/">
					<span class="flex select-none flex-row items-center gap-2 text-xl">
						<LogoType class="h-12" />
					</span>
				</NuxtLink>
				<ExternalLink target="_blank" to="https://github.com/worldwidepixel/badger-new">
					Badger is open-source.
				</ExternalLink>
			</div>
			<div class="flex flex-col items-center gap-1 sm:items-start">
				<span class="decoration-badger-red text-lg font-bold underline decoration-wavy">About</span>
				Badger is a badge creator for the web.
				<ExternalLink target="_blank" to="https://github.com/worldwidepixel/badger-new">
					Created by WorldWidePixel.
				</ExternalLink>
			</div>
		</footer>
	</div>
</template>
<script setup>
const props = defineProps(["error"]);
useSeoMeta({
	title: "Error",
	ogTitle: "Badger: A badge creator for the web",
	description: "Create beautiful modern, and unique badges using Badger.",
	ogDescription: "Create beautiful modern, and unique badges using Badger.",
	ogImage: "https://badger-staging.worldwidepixel.ca/img/ogimg.png",
});
const errorSplashes = [
	"Oh no!",
	"Skill Issue!",
	"We need to burrow back to you.",
	"Please come back in regular business hours.",
	"Try turning it off and on again!",
	"Oops!",
	"It seems I have died.",
	"Page here when Alto releases",
	"Have you cleared your cache?",
	"Probably your fault.",
	"Hi! I'm Badger, and I'm a crashaholic.",
	"Probably not meant to happen.",
	"I blame Crowdstrike.",
	"Is Vercel down?",
	"Is Cloudflare down?",
	"Is Github down?",
	"Try removing Essential.",
	"explod",
	"Not broken at all!",
	"Please contact our 100% human chatbot for support.",
	"Is Modrinth down?",
	"I blame Microsoft.",
	"Email contact (at) nineminecraft.com for support.",
	"How did you get here?",
	"Mind the gap.",
	"Does it work on Firefox?",
	"Try Internet Explorer instead.",
	"This error page is brought to you by NordVPN.",
	"This error page is brought to you by Bisect Hosting.",
	"Just ping WorldWidePixel already.",
	">:)",
	"Are you sure this isn't staging?",
	"Good to see you!",
	"Your fault.",
	"My fault.",
];
const badgerSvg = `<svg
   width="70.000023mm"
   height="70.000023mm"
   viewBox="0 0 70.000023 70.000023"
   version="1.1"
   id="svg3909"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs3906">
    <linearGradient
       xlink:href="#linearGradient4669-7"
       id="linearGradient21526"
       gradientUnits="userSpaceOnUse"
       x1="5310.2358"
       y1="2003.1495"
       x2="5574.8027"
       y2="1738.5826" />
    <linearGradient
       id="linearGradient4669-7">
      <stop
         style="stop-color:#6900ff;stop-opacity:1;"
         offset="0"
         id="stop4665" />
      <stop
         style="stop-color:#c800ff;stop-opacity:1"
         offset="1"
         id="stop4667" />
    </linearGradient>
    <linearGradient
       xlink:href="#linearGradient16706"
       id="linearGradient21528"
       gradientUnits="userSpaceOnUse"
       x1="5490.9385"
       y1="1690.1637"
       x2="5394.1001"
       y2="2051.5688" />
    <linearGradient
       id="linearGradient16706">
      <stop
         style="stop-color:#ffa915;stop-opacity:1"
         offset="0"
         id="stop16702" />
      <stop
         style="stop-color:#ff813e;stop-opacity:1"
         offset="1"
         id="stop16704" />
    </linearGradient>
    <linearGradient
       xlink:href="#linearGradient9738-8"
       id="linearGradient21530"
       gradientUnits="userSpaceOnUse"
       x1="5394.1006"
       y1="1690.1633"
       x2="5490.939"
       y2="2051.5686" />
    <linearGradient
       id="linearGradient9738-8">
      <stop
         style="stop-color:#006efc;stop-opacity:1"
         offset="0"
         id="stop9734" />
      <stop
         style="stop-color:#5208ff;stop-opacity:1"
         offset="1"
         id="stop9736" />
    </linearGradient>
    <linearGradient
       xlink:href="#linearGradient2809"
       id="linearGradient21532"
       gradientUnits="userSpaceOnUse"
       x1="5310.2363"
       y1="1738.5823"
       x2="5574.8032"
       y2="2003.1493" />
    <linearGradient
       id="linearGradient2809">
      <stop
         style="stop-color:#ff3f5e;stop-opacity:1"
         offset="0"
         id="stop2805" />
      <stop
         style="stop-color:#ff331d;stop-opacity:1"
         offset="1"
         id="stop2807" />
    </linearGradient>
  </defs>
  <g
     id="layer1">
    <rect
       style="font-variation-settings:normal;vector-effect:none;fill:#000000;fill-opacity:0;fill-rule:evenodd;stroke:#000080;stroke-width:0;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;-inkscape-stroke:none;stop-color:#000000"
       id="rect182974-6-5-2-6-8-5-2-9-2"
       width="70"
       height="70"
       x="0"
       y="0" />
    <path
       style="fill:url(#linearGradient21526);fill-opacity:1;stroke:none;stroke-width:15.1181;stroke-linecap:square;stroke-opacity:1"
       id="path5987-92-8-3"
       transform="matrix(0.30868124,0,0,0.30868056,-1645.0037,-542.49999)"
       d="m 5442.5195,1757.4803 98.195,170.0787 -196.39,0 z" />
    <path
       style="fill:url(#linearGradient21528);fill-opacity:1;stroke-width:15.1181;stroke-linecap:square"
       id="path5987-92-1-7-4"
       transform="matrix(0.2673258,0.15434027,-0.15434061,0.26732521,-1131.1752,-1305.1297)"
       d="m 5442.5195,1757.4803 98.195,170.0787 -196.39,0 z" />
    <path
       style="fill:url(#linearGradient21530);fill-opacity:1;stroke-width:15.1181;stroke-linecap:square"
       id="path5987-92-6-9-4"
       transform="matrix(0.15434062,0.2673252,-0.26732579,0.15434028,-304.8712,-1708.6726)"
       d="m 5442.5195,1757.4803 98.195,170.0787 -196.39,0 z" />
    <path
       style="fill:url(#linearGradient21532);fill-opacity:1;stroke-width:15.1181;stroke-linecap:square"
       id="path5987-92-0-1-2"
       transform="matrix(0,0.30868056,-0.30868124,0,612.5012,-1645)"
       d="m 5442.5195,1757.4803 98.195,170.0787 -196.39,0 z" />
  </g>
</svg>
`;
const errorSplash = errorSplashes[Math.floor(Math.random() * errorSplashes.length)];
const errorCode = props.error.statusCode.toString().replace("0", badgerSvg);
</script>
