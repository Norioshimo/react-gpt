interface Props {
  text: string;
  imageUrl: string;
  alt: string;
  onImageSelected?: (imageUrl: string) => void;
}

export const GptMessageImage = ({
  text,
  imageUrl,
  alt,
  onImageSelected,
}: Props) => {
  return (
    <div className={`col-start-1 col-end-9 p-3 rounded-lg  `}>
      <div className={`flex flex-row items-start `}>
        <div
          className={`flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0 bg-green-600 text-white font-bold`}
        >
          G
        </div>
        <div
          className={`relative ml-3 text-sm pt-3 pb-3 px-4 shadow rounded-xl bg-black/25 text-white`}
        >
          <span>{text}</span>
          <img
            src={imageUrl}
            alt={alt}
            className="mt-2 rounded-xl w-96 object-cover"
            onClick={() => onImageSelected && onImageSelected(imageUrl)}
          />
        </div>
      </div>
    </div>
  );
};
