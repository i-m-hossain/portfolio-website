function ErrorMessage({title, error}: {title: string , error: string}) {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <svg className="h-12 w-12 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Error Loading Resumes</h3>
                    <p className="mt-2 text-sm text-gray-500">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    )

}

export default ErrorMessage