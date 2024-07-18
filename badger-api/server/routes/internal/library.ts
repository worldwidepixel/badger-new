export default defineEventHandler(async (event) => {
  const library = {
    Available: [],
    "Built With": [],
    Documentation: [],
    Donate: [],
    Social: [
      {
        title: "Codeberg Plural",
        topText: "See us on",
        bottomText: "Codeberg",
        topTextColour: "E8E8E8",
        bottomTextColour: "7AB3DE",
        topColour: "132430",
        bottomColour: "323232",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Codeberg_Logo.svg",
      },
      {
        title: "Codeberg Singular",
        topText: "See me on",
        bottomText: "Codeberg",
        topTextColour: "E8E8E8",
        bottomTextColour: "7AB3DE",
        topColour: "132430",
        bottomColour: "323232",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Codeberg_Logo.svg",
      },
      {
        title: "Discord Plural",
        topText: "Chat with us on",
        bottomText: "Discord",
        topTextColour: "E8E8E8",
        bottomTextColour: "5865F2",
        topColour: "1B1D31",
        bottomColour: "11121F",
        icon: "https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg",
      },
      {
        title: "Discord Singular",
        topText: "Chat with me on",
        bottomText: "Discord",
        topTextColour: "E8E8E8",
        bottomTextColour: "5865F2",
        topColour: "1B1D31",
        bottomColour: "11121F",
        icon: "https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg",
      },
      {
        title: "Discourse Plural",
        topText: "Chat with us on",
        bottomText: "Discourse",
        topTextColour: "E8E8E8",
        bottomTextColour: "FFF9AE",
        topColour: "353426",
        bottomColour: "27261C",
        icon: "https://upload.wikimedia.org/wikipedia/commons/1/17/Discourse_icon.svg",
      },
      {
        title: "Discourse Singular",
        topText: "Chat with me on",
        bottomText: "Discourse",
        topTextColour: "E8E8E8",
        bottomTextColour: "FFF9AE",
        topColour: "353426",
        bottomColour: "27261C",
        icon: "https://upload.wikimedia.org/wikipedia/commons/1/17/Discourse_icon.svg",
      },
      {
        title: "Disqus Plural",
        topText: "Chat with us on",
        bottomText: "Disqus",
        topTextColour: "E8E8E8",
        bottomTextColour: "2299F8",
        topColour: "051F30",
        bottomColour: "031420",
        icon: "https://upload.wikimedia.org/wikipedia/commons/9/99/Disqus_d_icon_(blue).svg",
      },
      {
        title: "Disqus Singular",
        topText: "Chat with me on",
        bottomText: "Disqus",
        topTextColour: "E8E8E8",
        bottomTextColour: "2299F8",
        topColour: "051F30",
        bottomColour: "031420",
        icon: "https://upload.wikimedia.org/wikipedia/commons/9/99/Disqus_d_icon_(blue).svg",
      },
      {
        title: "Giscus Plural",
        topText: "Chat with us on",
        bottomText: "Giscus",
        topTextColour: "E8E8E8",
        bottomTextColour: "8CCAF7",
        topColour: "242E35",
        bottomColour: "12202B",
        icon: "https://avatars.githubusercontent.com/u/81452695?s=400",
      },
      {
        title: "Giscus Singular",
        topText: "Chat with me on",
        bottomText: "Giscus",
        topTextColour: "E8E8E8",
        bottomTextColour: "8CCAF7",
        topColour: "242E35",
        bottomColour: "12202B",
        icon: "https://avatars.githubusercontent.com/u/81452695?s=400",
      },
      {
        title: "Github Plural",
        topText: "See us on",
        bottomText: "Github",
        topTextColour: "E8E8E8",
        bottomTextColour: "FFFFFF",
        topColour: "181F29",
        bottomColour: "0F131A",
        icon: "https://raw.githubusercontent.com/rdimascio/icons/master/icons/light/github.svg",
      },
      {
        title: "Github Singular",
        topText: "See me on",
        bottomText: "Github",
        topTextColour: "E8E8E8",
        bottomTextColour: "FFFFFF",
        topColour: "181F29",
        bottomColour: "0F131A",
        icon: "https://raw.githubusercontent.com/rdimascio/icons/master/icons/light/github.svg",
      },
      {
        title: "Gitlab Plural",
        topText: "See us on",
        bottomText: "Gitlab",
        topTextColour: "E8E8E8",
        bottomTextColour: "F5B253",
        topColour: "2E0E09",
        bottomColour: "1F1506",
        icon: "https://upload.wikimedia.org/wikipedia/commons/3/35/GitLab_icon.svg",
      },
      {
        title: "Gitlab Singular",
        topText: "See me on",
        bottomText: "Gitlab",
        topTextColour: "E8E8E8",
        bottomTextColour: "F5B253",
        topColour: "2E0E09",
        bottomColour: "1F1506",
        icon: "https://upload.wikimedia.org/wikipedia/commons/3/35/GitLab_icon.svg",
      },
      {
        title: "Guilded Plural",
        topText: "Chat with us on",
        bottomText: "Guilded",
        topTextColour: "E8E8E8",
        bottomTextColour: "F5C400",
        topColour: "322C16",
        bottomColour: "231F0F",
        icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/guilded.svg",
      },
      {
        title: "Guilded Singular",
        topText: "Chat with me on",
        bottomText: "Guilded",
        topTextColour: "E8E8E8",
        bottomTextColour: "F5C400",
        topColour: "322C16",
        bottomColour: "231F0F",
        icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/master/Papirus/64x64/apps/guilded.svg",
      },
      {
        title: "Mastodon Plural",
        topText: "Chat with us on",
        bottomText: "Mastodon",
        topTextColour: "E8E8E8",
        bottomTextColour: "9393FF",
        topColour: "1C1036",
        bottomColour: "0B0920",
        icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Mastodon_logotype_(simple)_new_hue.svg",
      },
      {
        title: "Mastodon Singular",
        topText: "Chat with me on",
        bottomText: "Mastodon",
        topTextColour: "E8E8E8",
        bottomTextColour: "9393FF",
        topColour: "1C1036",
        bottomColour: "0B0920",
        icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Mastodon_logotype_(simple)_new_hue.svg",
      },
      {
        title: "Matrix Plural",
        topText: "Chat with us on",
        bottomText: "Matrix",
        topTextColour: "E8E8E8",
        bottomTextColour: "FFFFFF",
        topColour: "373737",
        bottomColour: "202020",
        icon: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Matrix_icon_(white).svg",
      },
      {
        title: "Matrix Singular",
        topText: "Chat with me on",
        bottomText: "Matrix",
        topTextColour: "E8E8E8",
        bottomTextColour: "FFFFFF",
        topColour: "373737",
        bottomColour: "202020",
        icon: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Matrix_icon_(white).svg",
      },
      {
        title: "Revolt Plural",
        topText: "Chat with us on",
        bottomText: "Revolt",
        topTextColour: "E8E8E8",
        bottomTextColour: "FF4654",
        topColour: "301515",
        bottomColour: "1E0D0D",
        icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/ad50c97a5208477cb0185d33b5bea661aef44c08/Papirus/64x64/apps/revolt-desktop.svg",
      },
      {
        title: "Revolt Singular",
        topText: "Chat with me on",
        bottomText: "Revolt",
        topTextColour: "E8E8E8",
        bottomTextColour: "FF4654",
        topColour: "301515",
        bottomColour: "1E0D0D",
        icon: "https://raw.githubusercontent.com/PapirusDevelopmentTeam/papirus-icon-theme/ad50c97a5208477cb0185d33b5bea661aef44c08/Papirus/64x64/apps/revolt-desktop.svg",
      },
      {
        title: "Slack Plural",
        topText: "Chat with us on",
        bottomText: "Slack",
        topTextColour: "E8E8E8",
        bottomTextColour: "D54AD5",
        topColour: "2C0C2C",
        bottomColour: "1C081C",
        icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
      },
      {
        title: "Slack Singular",
        topText: "Chat with me on",
        bottomText: "Slack",
        topTextColour: "E8E8E8",
        bottomTextColour: "D54AD5",
        topColour: "2C0C2C",
        bottomColour: "1C081C",
        icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
      },
      {
        title: "Twitch Plural",
        topText: "Watch us on",
        bottomText: "Twitch",
        topTextColour: "E8E8E8",
        bottomTextColour: "9146ff",
        topColour: "1E142F",
        bottomColour: "150E20",
        icon: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Twitch_Glitch_Logo_Purple.svg",
      },
      {
        title: "Twitch Singular",
        topText: "Watch me on",
        bottomText: "Twitch",
        topTextColour: "E8E8E8",
        bottomTextColour: "9146ff",
        topColour: "1E142F",
        bottomColour: "150E20",
        icon: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Twitch_Glitch_Logo_Purple.svg",
      },
      {
        title: "Twitter Plural",
        topText: "Chat with us on",
        bottomText: "Twitter",
        topTextColour: "E8E8E8",
        bottomTextColour: "1D9BF0",
        topColour: "051F30",
        bottomColour: "031420",
        icon: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
      },
      {
        title: "Twitter Singular",
        topText: "Chat with me on",
        bottomText: "Twitter",
        topTextColour: "E8E8E8",
        bottomTextColour: "1D9BF0",
        topColour: "051F30",
        bottomColour: "031420",
        icon: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
      },
      {
        title: "Youtube Plural",
        topText: "Watch us on",
        bottomText: "Youtube",
        topTextColour: "E8E8E8",
        bottomTextColour: "F22F21",
        topColour: "321513",
        bottomColour: "210E0C",
        icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_(2017).svg",
      },
      {
        title: "Youtube Singular",
        topText: "Watch me on",
        bottomText: "Youtube",
        topTextColour: "E8E8E8",
        bottomTextColour: "F22F21",
        topColour: "321513",
        bottomColour: "210E0C",
        icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_(2017).svg",
      },
    ],
    Requires: [],
    Supported: [],
    Unsupported: [],
    Translate: [],
  };

  setHeader(event, "Access-Control-Allow-Origin", "*");

  return library;
});
