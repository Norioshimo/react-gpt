import { FormEvent, useRef, useState } from "react";

interface Props {
  onSendMessage: (message: string, file: File) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string; // image/*
}

export const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  accept,
}: Props) => {
  const [message, setMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null,
  );
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handledSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`handledSendMessage`);
    //if (message.trim().length === 0) return;
    if(!selectedFile)return;

    onSendMessage(message,selectedFile);
    setMessage("");
    setSelectedFile(null);
  };

  return (
    <form
      onSubmit={handledSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="mr-3">
        <button
          type="button"
          className="flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={() => inputFileRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
        </button>
        <input
          type="file"
          ref={inputFileRef}
          accept={accept}
          onChange={(e) => setSelectedFile(e.target.files?.item(0))}
          hidden
        />
      </div>

      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full boder rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4"
            placeholder={placeholder}
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? "true" : "false"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary cursor-pointer" disabled={!selectedFile}>
          {!selectedFile ? (
            <span className="fa-regular fa-paper-plane">Enviar</span>
          ) : (
            <span className="fa-regular fa-paper-plane">
              {selectedFile.name.substring(0, 10) + "..."}
            </span>
          )}
        </button>
      </div>
    </form>
  );
};
