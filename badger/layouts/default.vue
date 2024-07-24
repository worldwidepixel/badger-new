<template>
	<div class="flex flex-col dark:bg-[var(--dark-1)] dark:text-white">
		<NavBar />

		<main class="relative flex min-h-[95vh] w-full flex-1">
			<NuxtPage />
		</main>

		<footer
			class="flex flex-col justify-center gap-6 border-t p-4 py-8 text-sm sm:flex-row sm:items-center dark:bg-[var(--dark-2)]">
			<div class="flex flex-col items-center gap-1 sm:items-start">
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

<style>
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

html.dark {
	background-color: var(--dark-1);
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
