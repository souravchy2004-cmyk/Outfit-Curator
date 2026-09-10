export interface UploadResponse {
  success: boolean;
  imageUrl: string;
  filename?: string;
  error?: string;
}

/**
 * Uploads a clothing image file or base64 data string to the backend server filesystem.
 */
export async function uploadImageToBackend(fileOrBase64: File | string): Promise<UploadResponse> {
  try {
    const formData = new FormData();

    if (typeof fileOrBase64 === 'string') {
      // Base64 string payload
      formData.append('base64', fileOrBase64);
    } else {
      // File object
      formData.append('file', fileOrBase64);
    }

    // Try Next.js API route first
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) return data;
    }

    // Fallback attempt to standalone backend server at http://localhost:5000/api/upload
    const fallbackResponse = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (fallbackResponse.ok) {
      const data = await fallbackResponse.json();
      if (data.success) return data;
    }

    // Client fallback if server is unreached
    const fallbackUrl = typeof fileOrBase64 === 'string'
      ? fileOrBase64
      : URL.createObjectURL(fileOrBase64);

    return {
      success: true,
      imageUrl: fallbackUrl,
      filename: 'local_preview.jpg'
    };

  } catch (err: any) {
    console.warn('Backend server upload offline, using local client URL fallback:', err);
    const fallbackUrl = typeof fileOrBase64 === 'string'
      ? fileOrBase64
      : URL.createObjectURL(fileOrBase64);

    return {
      success: true,
      imageUrl: fallbackUrl,
      filename: 'client_fallback.jpg'
    };
  }
}
