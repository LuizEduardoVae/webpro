
const YOUTUBE_API_KEY = "AIzaSyAPUGllbc-TYRUB5VL9DcknF-UeVV7e3Gw"; // Provided by user
const UPLOADS_PLAYLIST_ID = "UUCOn7reKcoTlRlbLyImwI_g"; // Derived from Channel ID: UCCOn7reKcoTlRlbLyImwI_g

export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
    duration?: string;
    viewCount?: string;
    url: string;
}

export async function getLatestVideos(): Promise<YouTubeVideo[]> {
    try {
        // 1. Fetch latest 3 uploads from the main uploads playlist
        const uploadsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=3&key=${YOUTUBE_API_KEY}`,
            { next: { revalidate: 3600 } }
        );

        let videos: YouTubeVideo[] = [];

        if (uploadsResponse.ok) {
            const uploadsData = await uploadsResponse.json();

            if (uploadsData.items && uploadsData.items.length > 0) {
                // Extract video IDs
                const videoIds = uploadsData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');

                // Fetch validation details for these 3 videos
                const videosResponse = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
                    { next: { revalidate: 3600 } }
                );

                if (videosResponse.ok) {
                    const videosData = await videosResponse.json();
                    videos = videosData.items.map((item: any) => ({
                        id: item.id,
                        title: item.snippet.title,
                        thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
                        publishedAt: item.snippet.publishedAt,
                        duration: parseDuration(item.contentDetails.duration),
                        viewCount: formatViewCount(item.statistics.viewCount),
                        url: `https://www.youtube.com/watch?v=${item.id}`
                    }));
                }
            }
        }

        // 2. Fetch "Fourier" Playlist details explicitly
        const FOURIER_PLAYLIST_ID = "PLVi9FKj16_xwPXXacjIbn7EDPkUJ8AVTj";
        const playlistResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${FOURIER_PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`,
            { next: { revalidate: 3600 } }
        );

        if (playlistResponse.ok) {
            const playlistData = await playlistResponse.json();
            if (playlistData.items && playlistData.items.length > 0) {
                const playlist = playlistData.items[0];
                const fourierItem: YouTubeVideo = {
                    id: playlist.id,
                    title: playlist.snippet.title,
                    thumbnail: playlist.snippet.thumbnails.maxres?.url || playlist.snippet.thumbnails.high?.url || playlist.snippet.thumbnails.medium?.url,
                    publishedAt: playlist.snippet.publishedAt, // or use latest update time if available
                    duration: `${playlist.contentDetails.itemCount} videos`, // Special display for playlist
                    viewCount: "Series", // Special label
                    url: `https://www.youtube.com/playlist?list=${playlist.id}`
                };

                // Push to the end of the array (4th slot)
                videos.push(fourierItem);
            }
        }

        return videos;

    } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        return [];
    }
}

// Helper to parse ISO 8601 duration (PT12M45S) to human readable (12:45)
function parseDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "";

    const hours = (match[1] || "").replace("H", "");
    const minutes = (match[2] || "").replace("M", "");
    const seconds = (match[3] || "").replace("S", "");

    if (hours) {
        return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }

    if (minutes) {
        return `${minutes}:${seconds.padStart(2, '0')}`;
    }

    return `0:${seconds.padStart(2, '0')}`;
}

function formatViewCount(views: string): string {
    const num = parseInt(views, 10);
    if (isNaN(num)) return views;

    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return views;
}
