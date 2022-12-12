export async function getWatchProviders() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/watch/providers/movie?api_key=817bc93f0361c0bdcb9ae9a48e053d3a&language=en-US&watch_region=BR`
    );
    const data = await response.json();
    const watchProviders = data.results.map(((provider: any) => provider.provider_name))

    return watchProviders;
  }
  catch (e) {
    console.log(e);
  }
}
