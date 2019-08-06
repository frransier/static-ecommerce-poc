import YoutubePreview from "../../../site/src/components/youtube";

export default {
  title: "Youtube video",
  name: "youtube",
  type: "object",
  fields: [
    {
      title: "URL",
      name: "url",
      type: "url"
    }
  ],
  preview: {
    select: {
      url: "url"
    },
    component: YoutubePreview
  }
};
