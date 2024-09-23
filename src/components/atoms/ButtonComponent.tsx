interface ButtonComponentProps {
  isDisabled: boolean;
  text: string;
  errorText: string;
}
const ButtonComponent = ({
  isDisabled,
  text,
  errorText,
}: ButtonComponentProps) => {
  return (
    <div className="mt-12 flex w-full justify-center">
      <div className="group relative w-10/12 md:w-1/2">
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full rounded-xl py-4 text-base text-white ${isDisabled
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-gradient-to-r from-logoColorGreen to-logoColorBlue'
            } `}
        >
          {text}
        </button>
        {isDisabled && (
          <div className="absolute bottom-full mb-2 hidden w-full text-center text-sm text-red-500 group-hover:block">
            {errorText}
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonComponent;
