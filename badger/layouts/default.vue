<template>
	<div class="dark:text-white dark:bg-[var(--dark-1)] flex flex-col">
		<NavBar />

		<div class="flex-auto flex-grow h-fit">
			<NuxtPage />
		</div>

		<footer
			class="flex flex-col sm:flex-row justify-center sm:items-center border-t dark:bg-[var(--dark-2)] p-4 py-8 gap-6 text-sm"
		>
			<div class="flex flex-col gap-1 items-center sm:items-start">
				<NuxtLink to="/">
					<span
						class="flex flex-row gap-2 items-center text-xl select-none"
					>
						<LogoType class="h-12" />
					</span>
				</NuxtLink>
				<ExternalLink
					target="_blank"
					to="https://github.com/worldwidepixel/badger-new"
				>
					Badger is open-source.
				</ExternalLink>
			</div>
			<div class="flex flex-col gap-1 items-center sm:items-start">
				<span
					class="font-bold text-lg underline decoration-wavy decoration-[var(--brand-red)]"
					>About</span
				>
				Badger is a badge creator for the web.
				<ExternalLink
					target="_blank"
					to="https://github.com/worldwidepixel/badger-new"
				>
					Created by WorldWidePixel.
				</ExternalLink>
			</div>
		</footer>
	</div>
</template>

<style>
/*@font-face {
  font-family: 'Inter-nal';
  src: url('./fonts/static/Inter-Black.ttf') format('truetype');
  font-weight: 900;
}

@font-face {
  font-family: 'Inter-nal';
  src: url('./fonts/static/Inter-ExtraBold.ttf') format('truetype');
  font-weight: 800;
}

@font-face {
  font-family: 'Inter-nal';
  src: url('./fonts/static/Inter-Bold.ttf') format('truetype');
  font-weight: 700;
}

@font-face {
  font-family: 'Inter-nal';
  src: url('./fonts/static/Inter-SemiBold.ttf') format('truetype');
  font-weight: 600;
}

@font-face {
  font-family: 'Inter-nal';
  src: url('./fonts/static/Inter-Medium.ttf') format('truetype');
  font-weight: 500;
}

@font-face {
  font-family: 'Inter-nal';
  src: url('./fonts/static/Inter-Regular.ttf') format('truetype');
  font-weight: 400;
}

@font-face {
  font-family: 'Inter-nal';
  src: url('./fonts/static/Inter-Light.ttf') format('truetype');
  font-weight: 300;
}

@font-face {
  font-family: 'Inter-nal';
  src: url('./fonts/static/Inter-ExtraLight.ttf') format('truetype');
  font-weight: 200;
}

@font-face {
  font-family: 'Inter-nal';
  src: url('./fonts/static/Inter-Thin.ttf') format('truetype');
  font-weight: 100;
} */

@import url(https://fonts.bunny.net/css?family=inter:100,200,300,400,500,600,700,800,900);

:root {
	--brand-red: #ff125e;
	--brand-orange: #ff8e31;
	--brand-green: #00e54a;
	--brand-blue: #047eff;
	--brand-violet: #6900ff;
	--dark-main: #ffffff;
	--dark-text: #c5cfd3;
	--dark-0: #000000;
	--dark-1: #0b0d0e;
	--dark-2: #161b1d;
	--dark-3: #21292c;
	--dark-4: #2c363a;
	--dark-5: #374449;
	--dark-6: #4d5f66;
	--dark-7: #637a83;
}

.dark * {
	border-color: var(--dark-3);
}

body {
	font-family: "Inter", sans-serif;
	height: 100%;
}

html {
	height: 100%;
}

#__nuxt {
	height: 100%;
}

.designGrid {
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
}
</style>
