
/**
 * Generates a coloring page image by calling our backend API.
 * @param userPrompt The user's description of the desired image.
 * @returns A promise that resolves to the base64 encoded image string.
 */
export const generateColoringPage = async (userPrompt: string): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response.' }));
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.image) {
      return data.image;
    } else {
      throw new Error("API did not return a valid image.");
    }
  } catch (error) {
    console.error("Error calling backend API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate coloring page: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the page.");
  }
};
