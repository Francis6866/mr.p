export const Loader = ({message}) => {
    return (
        <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                <p className="text-gray-600">{message}</p>
            </div>
        </div>
    )
}