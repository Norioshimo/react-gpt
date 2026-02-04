import OpenAI from "openai";


interface Options {
    prompt: string;

}

export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => {

    const { prompt } = options;


    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",// El modelo lo trata como instrucciones obligatorias.
                content: `Eres un corrector ortográfico.
                    Analiza textos en español.
                    Devuelve JSON válido con:
                    - correcciones
                    - mensaje
                    - porcentaje_acierto
                    No agregues texto fuera del JSON.
                `
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.3,
        max_tokens: 150
    })

    console.log(`respuesta open AI`)
    console.log(completion)
    console.log(completion.choices[0].message.content)

    const jsonResp = JSON.parse(completion.choices[0].message.content || '')

    return jsonResp;

}