
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, GenerateImagesResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY });

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (!API_KEY) {
    return res.status(500).json({ error: "A chave da API não está configurada no servidor." });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { prompt: userPrompt } = req.body;

  if (!userPrompt || typeof userPrompt !== 'string') {
    return res.status(400).json({ error: 'O prompt é obrigatório e deve ser um texto.' });
  }

  const fullPrompt = `Página de livro de colorir para crianças, contornos pretos grossos e limpos, sem sombreamento, sem cores, fundo totalmente branco. Estilo de desenho vetorial simples. O desenho deve ser de: ${userPrompt}`;

  try {
    const response: GenerateImagesResponse = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
      const base64Image = response.generatedImages[0].image.imageBytes;
      return res.status(200).json({ image: base64Image });
    } else {
      console.error("A API não retornou uma resposta de imagem válida:", response);
      return res.status(500).json({ error: "A API não retornou uma imagem válida." });
    }
  } catch (error) {
    console.error("Erro ao gerar imagem com a API Gemini:", error);
    return res.status(500).json({ error: "Falha ao gerar a página para colorir." });
  }
}
