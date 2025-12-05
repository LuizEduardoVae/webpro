
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
        // 1. Fetch latest uploads from the playlist
        const playlistResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=4&key=${YOUTUBE_API_KEY}`,
            { next: { revalidate: 3600 } } // Revalidate every hour
        );

        if (!playlistResponse.ok) {
            console.error("Failed to fetch playlist items", await playlistResponse.text());
            return [];
        }

        const playlistData = await playlistResponse.json();

        if (!playlistData.items || playlistData.items.length === 0) {
            return [];
        }

        // 2. Extract video IDs to fetch details (duration, view count)
        const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');

        // 3. Fetch video details
        const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
            { next: { revalidate: 3600 } }
        );

        if (!videosResponse.ok) {
            console.error("Failed to fetch video details", await videosResponse.text());
            // Fallback to basic info from playlist items if video details fail
            return playlistData.items.map((item: any) => ({
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
                publishedAt: item.snippet.publishedAt,
                url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
            }));
        }

        const videosData = await videosResponse.json();

        // 4. Merge and format data
        return videosData.items.map((item: any) => {
            const duration = parseDuration(item.contentDetails.duration);
            return {
                id: item.id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
                publishedAt: item.snippet.publishedAt,
                duration: duration,
                viewCount: formatViewCount(item.statistics.viewCount),
                url: `https://www.youtube.com/watch?v=${item.id}`
            };
        });

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
