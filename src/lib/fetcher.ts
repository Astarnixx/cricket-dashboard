export async function fetcher(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      // Attach extra info to error object for debugging
      (error as Error & { info?: unknown; status?: number }).info = await res.json();
      (error as Error & { info?: unknown; status?: number }).status = res.status;
      throw error;
    }
    return res.json();
  }
  