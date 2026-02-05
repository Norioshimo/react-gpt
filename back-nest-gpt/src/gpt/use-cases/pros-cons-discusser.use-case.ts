import OpenAI from "openai";

interface Options {
    prompt: string;
}


export const prosConsDiscusserUseCase = async (openai: OpenAI, { prompt }: Options) => {

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `
                Eres un asistente analítico.
                Recibirás una pregunta y deberás responderla evaluando ventajas y desventajas.

                Reglas de respuesta:
                - Usa exclusivamente formato Markdown.
                - Incluye dos secciones obligatorias:
                ## Pros
                ## Contras
                - Cada sección debe contener una lista con viñetas.
                - Sé claro, objetivo y conciso.
                - No agregues texto fuera de las secciones indicadas.
                `
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0.8,// Mayor temperatura mayor la variación de la respuesta
        max_tokens: 500
    });

    return response.choices[0].message;
}