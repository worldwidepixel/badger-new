<template>

  <div class="flex flex-row h-full">

    <div class="flex flex-col gap-4 grow shrink-0 p-4">

      <span class="font-bold text-3xl"> Edit </span>

      <div class="w-fit flex flex-col gap-2 p-4 rounded-3xl border">

        <span class="w-fit text-xl font-medium"> Background </span>

        <span class="w-fit flex flex-row gap-4 items-center"> Top
          <ColorInput class="h-10" default-color="#8F004C" />
        </span>

        <span class="w-fit flex flex-row gap-4 items-center"> Bottom
          <ColorInput class="h-10" default-color="#61003D" />
        </span>

      </div>

      <div class="w-fit flex flex-col gap-2 p-4 rounded-3xl border">

        <span class="text-xl font-medium"> Icon </span>

        <ColorInput class="h-10" default-color="#8F004C" /> (placeholder)

      </div>

      <div class="w-fit flex flex-col gap-2 p-4 rounded-3xl border">

        <span class="text-xl font-medium"> Text </span>

        <ColorInput class="h-10" default-color="#8F004C" /> (placeholder)

      </div>

    </div>

    <div class="flex flex-col gap-4 border-l grow-0 shrink flex-shrink-0 p-4">

      <span class="font-bold text-3xl"> View </span>

      <span class="flex flex-row gap-2">

        <img
          src="../../cozy?gradientStart=8f004c&gradientEnd=61003d&lineOne=Made%20for&lineTwo=You&colourOne=ffffff&colourTwo=ff0066&iconUrl=https://badger.worldwidepixel.ca/img/badger.png">

        <img
          src="../../cozy_minimal?gradientStart=8f004c&gradientEnd=61003d&lineOne=Made%20for&lineTwo=You&colourOne=ffffff&colourTwo=ff0066&iconUrl=https://badger.worldwidepixel.ca/img/badger.png">

      </span>

    </div>

  </div>

</template>