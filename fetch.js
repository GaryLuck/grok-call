const apiKey = process.env.OPENROUTER_API_KEY;
const firstFrameUrl = process.env.FIRST_FRAME_URL;

if (!apiKey) {
  throw new Error("Set OPENROUTER_API_KEY first.");
}

if (!firstFrameUrl) {
  throw new Error("Set FIRST_FRAME_URL to a directly downloadable image URL.");
}

const response = await fetch("https://openrouter.ai/api/v1/videos", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "google/veo-3.1-lite",
    prompt:
      "show this woman smoking a cigarette",
    duration: 4,
    resolution: "720p",
    aspect_ratio: "16:9",
    generate_audio: false,
    frame_images: [
      {
        type: "image_url",
        image_url: {
          url: firstFrameUrl,
        },
        frame_type: "first_frame",
      },
    ],
  }),
});

if (!response.ok) {
  throw new Error(await response.text());
}

const job = await response.json();
console.log(job);