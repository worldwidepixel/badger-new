export default defineEventHandler(async (event) => {
  const library = {
    Available: {},
    "Built With": {},
    Documentation: {},
    Donate: {},
    Social: {
      "Codeberg Plural":
        "?gradientStart=132430&gradientEnd=323232&lineOne=See%20us%20on&lineTwo=Codeberg&colourOne=E8E8E8&colourTwo=7AB3DE&iconUrl=https://upload.wikimedia.org/wikipedia/commons/4/4e/Codeberg_Logo.svg",
      "Codeberg Singular":
        "?gradientStart=132430&gradientEnd=323232&lineOne=See%20me%20on&lineTwo=Codeberg&colourOne=E8E8E8&colourTwo=7AB3DE&iconUrl=https://upload.wikimedia.org/wikipedia/commons/4/4e/Codeberg_Logo.svg",
      "Discord Plural":
        "?gradientStart=1B1D31&gradientEnd=11121F&lineOne=Chat%20with%20us%20on&lineTwo=Discord&colourOne=E8E8E8&colourTwo=5865F2&iconUrl=https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg",
      "Discord Singular":
        "?gradientStart=1B1D31&gradientEnd=11121F&lineOne=Chat%20with%20me%20on&lineTwo=Discord&colourOne=E8E8E8&colourTwo=5865F2&iconUrl=https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg",
      "Discourse Plural":
        "?gradientStart=353426&gradientEnd=27261C&lineOne=Chat%20with%20us%20on&lineTwo=Discourse&colourOne=E8E8E8&colourTwo=FFF9AE&iconUrl=https://upload.wikimedia.org/wikipedia/commons/1/17/Discourse_icon.svg",
      "Discourse Singular":
        "?gradientStart=353426&gradientEnd=27261C&lineOne=Chat%20with%20me%20on&lineTwo=Discourse&colourOne=E8E8E8&colourTwo=FFF9AE&iconUrl=https://upload.wikimedia.org/wikipedia/commons/1/17/Discourse_icon.svg",
      "Disqus Plural":
        "?gradientStart=051F30&gradientEnd=031420&lineOne=Chat%20with%20us%20on&lineTwo=Disqus&colourOne=E8E8E8&colourTwo=2299F8&iconUrl=https://upload.wikimedia.org/wikipedia/commons/9/99/Disqus_d_icon_%28blue%29.svg",
      "Disqus Singular":
        "?gradientStart=051F30&gradientEnd=031420&lineOne=Chat%20with%20me%20on&lineTwo=Disqus&colourOne=E8E8E8&colourTwo=2299F8&iconUrl=https://upload.wikimedia.org/wikipedia/commons/9/99/Disqus_d_icon_%28blue%29.svg",
      "Giscus Plural":
        "?gradientStart=242E35&gradientEnd=12202B&lineOne=Chat%20with%20us%20on&lineTwo=Giscus&colourOne=E8E8E8&colourTwo=8CCAF7&iconUrl=https://avatars.githubusercontent.com/u/81452695?s=400",
      "Giscus Singular":
        "?gradientStart=242E35&gradientEnd=12202B&lineOne=Chat%20with%20me%20on&lineTwo=Giscus&colourOne=E8E8E8&colourTwo=8CCAF7&iconUrl=https://avatars.githubusercontent.com/u/81452695?s=400",
      "Github Plural":
        "?gradientStart=181F29&gradientEnd=0F131A&lineOne=See%20us%20on&lineTwo=Github&colourOne=E8E8E8&colourTwo=FFFFFF&iconUrl=https://raw.githubusercontent.com/rdimascio/icons/master/icons/light/github.svg",
      "Github Singular":
        "?gradientStart=181F29&gradientEnd=0F131A&lineOne=See%20me%20on&lineTwo=Github&colourOne=E8E8E8&colourTwo=FFFFFF&iconUrl=https://raw.githubusercontent.com/rdimascio/icons/master/icons/light/github.svg",
      "Gitlab Plural":
        "?gradientStart=2E0E09&gradientEnd=1F1506&lineOne=See%20us%20on&lineTwo=Gitlab&colourOne=E8E8E8&colourTwo=F5B253&iconUrl=https://upload.wikimedia.org/wikipedia/commons/3/35/GitLab_icon.svg",
      "Gitlab Singular":
        "?gradientStart=2E0E09&gradientEnd=1F1506&lineOne=See%20me%20on&lineTwo=Gitlab&colourOne=E8E8E8&colourTwo=F5B253&iconUrl=https://upload.wikimedia.org/wikipedia/commons/3/35/GitLab_icon.svg",
      "Guilded Plural":
        "?gradientStart=322C16&gradientEnd=231F0F&lineOne=Chat%20with%20us%20on&lineTwo=Guilded&colourOne=E8E8E8&colourTwo=F5C400&iconUrl=https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/guilded.svg",
      "Guilded Singular":
        "?gradientStart=322C16&gradientEnd=231F0F&lineOne=Chat%20with%20me%20on&lineTwo=Guilded&colourOne=E8E8E8&colourTwo=F5C400&iconUrl=https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/guilded.svg",
      "Mastodon Plural":
        "?gradientStart=1C1036&gradientEnd=0B0920&lineOne=Chat%20with%20us%20on&lineTwo=Mastodon&colourOne=E8E8E8&colourTwo=9393FF&iconUrl=https://upload.wikimedia.org/wikipedia/commons/d/d5/Mastodon_logotype_%28simple%29_new_hue.svg",
      "Mastodon Singular":
        "?gradientStart=1C1036&gradientEnd=0B0920&lineOne=Chat%20with%20me%20on&lineTwo=Mastodon&colourOne=E8E8E8&colourTwo=9393FF&iconUrl=https://upload.wikimedia.org/wikipedia/commons/d/d5/Mastodon_logotype_%28simple%29_new_hue.svg",
      "Matrix Plural":
        "?gradientStart=373737&gradientEnd=202020&lineOne=Chat%20with%20us%20on&lineTwo=Matrix&colourOne=E8E8E8&colourTwo=FFFFFF&iconUrl=https://upload.wikimedia.org/wikipedia/commons/b/b7/Matrix_icon_%28white%29.svg",
      "Matrix Singular":
        "?gradientStart=373737&gradientEnd=202020&lineOne=Chat%20with%20me%20on&lineTwo=Matrix&colourOne=E8E8E8&colourTwo=FFFFFF&iconUrl=https://upload.wikimedia.org/wikipedia/commons/b/b7/Matrix_icon_%28white%29.svg",
      "Revolt Plural":
        "?gradientStart=301515&gradientEnd=1E0D0D&lineOne=Chat%20with%20us%20on&lineTwo=Revolt&colourOne=E8E8E8&colourTwo=FF4654&iconUrl=https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/ad50c97a5208477cb0185d33b5bea661aef44c08/Papirus/64x64/apps/revolt-desktop.svg",
      "Revolt Singular":
        "?gradientStart=301515&gradientEnd=1E0D0D&lineOne=Chat%20with%20me%20on&lineTwo=Revolt&colourOne=E8E8E8&colourTwo=FF4654&iconUrl=https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/ad50c97a5208477cb0185d33b5bea661aef44c08/Papirus/64x64/apps/revolt-desktop.svg",
      "Slack Plural":
        "?gradientStart=2C0C2C&gradientEnd=1C081C&lineOne=Chat%20with%20us%20on&lineTwo=Slack&colourOne=E8E8E8&colourTwo=D54AD5&iconUrl=https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
      "Slack Singular":
        "?gradientStart=2C0C2C&gradientEnd=1C081C&lineOne=Chat%20with%20me%20on&lineTwo=Slack&colourOne=E8E8E8&colourTwo=D54AD5&iconUrl=https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
      "Twitch Plural":
        "?gradientStart=1E142F&gradientEnd=150E20&lineOne=Watch%20us%20on&lineTwo=Twitch&colourOne=E8E8E8&colourTwo=9146ff&iconUrl=https://upload.wikimedia.org/wikipedia/commons/d/d3/Twitch_Glitch_Logo_Purple.svg",
      "Twitch Singular":
        "?gradientStart=1E142F&gradientEnd=150E20&lineOne=Watch%20me%20on&lineTwo=Twitch&colourOne=E8E8E8&colourTwo=9146ff&iconUrl=https://upload.wikimedia.org/wikipedia/commons/d/d3/Twitch_Glitch_Logo_Purple.svg",
      "Twitter Plural":
        "?gradientStart=051F30&gradientEnd=031420&lineOne=Chat%20with%20us%20on&lineTwo=Twitter&colourOne=E8E8E8&colourTwo=1D9BF0&iconUrl=https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
      "Twitter Singular":
        "?gradientStart=051F30&gradientEnd=031420&lineOne=Chat%20with%20me%20on&lineTwo=Twitter&colourOne=E8E8E8&colourTwo=1D9BF0&iconUrl=https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
      "Youtube Plural":
        "?gradientStart=321513&gradientEnd=210E0C&lineOne=Watch%20us%20on&lineTwo=Youtube&colourOne=E8E8E8&colourTwo=F22F21&iconUrl=https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
      "Youtube Singular":
        "?gradientStart=321513&gradientEnd=210E0C&lineOne=Watch%20me%20on&lineTwo=Youtube&colourOne=E8E8E8&colourTwo=F22F21&iconUrl=https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
    },
    Requires: {},
    Supported: {},
    Unsupported: {},
    Translate: {},
  };

  setHeader(event, "Access-Control-Allow-Origin", "*");

  return library;
});
