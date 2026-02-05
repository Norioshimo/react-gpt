import OpenAI from "openai";


interface Options {
    prompt: string;
    lang: string;

}

export const translateUseCase = async (openai: OpenAI, options: Options) => {

    const { prompt, lang } = options;


    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",// El modelo lo trata como instrucciones obligatorias.
                content: `Traduce el siguiente texto al idioma ${lang}:${prompt}
                `
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.2
    })

    console.log(`respuesta open AI. Traducido`)
    console.log(completion)



    return {message:completion.choices[0].message.content};

}