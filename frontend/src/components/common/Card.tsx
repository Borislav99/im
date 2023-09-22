export const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            {children}
        </div>
    );
};
