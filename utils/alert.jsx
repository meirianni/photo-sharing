export const SuccessAlert = () => {    
    return (
        <>
         <div className="fixed mt-10 right-0 bg-blue text-black p-2 text-sm rounded-lg z-999">
          Success! Your data has been submitted.
        </div>
        </>
    )
}

export const ErrorAlert = ({message}) => {    
    return (
        <>
         <div className="fixed mt-10 right-0 bg-red-500 text-white p-2 text-sm rounded-lg">
          {message}
        </div>
        </>
    )
}