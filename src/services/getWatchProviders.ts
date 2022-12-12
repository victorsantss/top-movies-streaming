interface WatchProvider {
  display_priorities: Object;
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export async function getWatchProviders() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/watch/providers/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&watch_region=BR`
    );
    const data = await response.json();
    const watchProviders = data.results.map(((provider: WatchProvider) => provider.provider_name)).sort();
    return watchProviders;
  }
  catch (e) {
    console.log(e);
  }
}
