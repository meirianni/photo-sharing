export const SuccessAlert = () => {
    console.log("sussscce");
    
    return (
        <>
         <div className="fixed top-10 right-10 bg-green-500 text-white p-4 rounded-lg">
          Success! Your data has been submitted.
        </div>
        </>
    )
}

export const ErrorAlert = ({message}) => {    
    return (
        <>
         <div className="fixed top-10 right-10 bg-red-500 text-white p-2 text-sm rounded-lg">
          {message}
        </div>
        </>
    )
}