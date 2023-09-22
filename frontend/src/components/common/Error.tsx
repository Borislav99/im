import "../../css/animation.css";

export const Error = ({ errorMessage }: { errorMessage: string }) => {
    return (
        <div className="text-center text-red-500 mb-6 animate-bounce">
            {errorMessage}
        </div>
    );
};
