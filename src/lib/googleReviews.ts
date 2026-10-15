import type { Review } from '../data/reviews';

export type GoogleSummary = {
  rating: number;
  count: number;
  reviews: Review[];
};

type PlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating: number;
    text?: { text: string };
    relativePublishTimeDescription?: string;
    authorAttribution?: { displayName: string; uri?: string; photoUri?: string };
  }[];
};

let cached: Promise<GoogleSummary | null> | undefined;

/**
 * Fetches the clinic's rating and latest reviews from the Google Places API (New) at build time.
 * Returns null when the API key / place ID aren't configured or the request fails, so the site
 * still builds and simply hides the Google-specific parts.
 */
export function getGoogleReviews(): Promise<GoogleSummary | null> {
  cached ??= load();
  return cached;
}

async function load(): Promise<GoogleSummary | null> {
  const key = import.meta.env.GOOGLE_PLACES_API_KEY;
  const placeId = import.meta.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
      },
    });
    if (!res.ok) throw new Error(`Places API responded ${res.status}`);
    const place = (await res.json()) as PlaceResponse;

    return {
      rating: place.rating ?? 0,
      count: place.userRatingCount ?? 0,
      reviews: (place.reviews ?? [])
        .filter((r) => r.text?.text)
        .map((r) => ({
          name: r.authorAttribution?.displayName ?? 'Google user',
          rating: r.rating,
          text: r.text!.text,
          when: r.relativePublishTimeDescription,
          photo: r.authorAttribution?.photoUri,
          url: r.authorAttribution?.uri,
          source: 'Google',
        })),
    };
  } catch (err) {
    console.warn('[googleReviews] Could not load Google reviews:', err);
    return null;
  }
}
