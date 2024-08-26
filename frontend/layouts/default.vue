<template>
	<div class="flex flex-col">
		<NavBar />

		<main class="relative flex min-h-[95vh] w-full flex-1 flex-col items-center px-6">
			<NuxtPage class="min-h-[95vh] max-w-[80rem]" />
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
