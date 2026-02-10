import OpenAI from 'openai';


interface Options {
  threadId: string;
  assistantId?: string;
}



export const createRunUseCase = async( openai: OpenAI, options: Options ) => {

  const idAssistant = process.env.ID_ASSISTANT||'';

  const { threadId, assistantId =idAssistant } = options;

  const run = await openai.beta.threads.runs.create( threadId, {
    assistant_id: assistantId,
    // instructions; // OJO! Sobre escribe el asistente
  });

  console.log({run});

  return run;

}