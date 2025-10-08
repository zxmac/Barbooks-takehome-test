export async function myFetch<T>(url: string, options = {}): Promise<T> {
  const modifiedOptions: RequestInit = { ...options };
  if (typeof window !== 'undefined') { // Client-side
    const token = localStorage.getItem('authToken');
    if (token) {
      modifiedOptions.headers = {
        ...modifiedOptions.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  } else { // Server-side
    // Add server-specific headers or logic
  }

  try {
    const response = await fetch(url, modifiedOptions);

    if (!response.ok) {
      console.error('Fetch error:', response.status, response.statusText);
    }
    const data = await response.json()
    return data;
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
}