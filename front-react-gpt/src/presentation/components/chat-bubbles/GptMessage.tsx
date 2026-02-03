import Markdown from "react-markdown";

interface Props {
  text: string;
  isUser?: boolean;
}

export const GptMessage = ({ text, isUser = false }: Props) => {
  return (
    <div
      className={`col-start-1 col-end-9 p-3 rounded-lg ${
        isUser ? "justify-end flex" : ""
      }`}
    >
      <div className={`flex flex-row items-start ${isUser ? "flex-row-reverse" : ""}`}>
        <div
          className={`flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0 ${
            isUser ? "bg-blue-600" : "bg-green-600"
          } text-white font-bold`}
        >
          {isUser ? "U" : "G"}
        </div>
        <div
          className={`relative ml-3 text-sm pt-3 pb-3 px-4 shadow rounded-xl ${
            isUser ? "bg-blue-100 text-black" : "bg-black/25 text-white"
          }`}
        >
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  );
};
