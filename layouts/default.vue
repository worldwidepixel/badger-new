<template>

  <div class="h-full flex flex-col">

    <NavBar />

    <div class="pb-4 flex-grow">

      <NuxtPage />

    </div>

  </div>

</template>

<style>
@font-face {
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
}

body {
  font-family: 'Inter-nal', sans-serif;
  height: 100%;
}

html {
  height: 100%;
}

#__nuxt {
  height: 100%;
}
</style>