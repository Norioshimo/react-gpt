import Markdown from "react-markdown";

interface Props {
  text: string;
  audio: string;
}

export const GptMessageAudio = ({ text, audio }: Props) => {
  return (
    <div className={`col-start-1 col-end-9 p-3 rounded-lg`}>
      <div className={`flex flex-row items-start `}>
        <div
          className={`flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0 bg-green-600
          } text-white font-bold`}
        >
          G
        </div>
        <div
          className={`relative ml-3 text-sm pt-3 pb-3 px-4 shadow rounded-xl bg-black/25 text-white`}
        >
          <Markdown>{text}</Markdown>
          <audio
          controls
          src={audio}
          className="w-full"
          autoPlay
          />
        </div>
      </div>
    </div>
  );
};
