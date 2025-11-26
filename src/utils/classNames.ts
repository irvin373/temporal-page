type inputClassName = {
    isValid: boolean,
    hasError: boolean,
    wasTouched: boolean;
}
export function getInputClassName( {isValid, hasError, wasTouched}: inputClassName){
    if(isValid){
        return "border-2 border-green-500 ring-transparent focus:border-green-600 focus:ring-2 focus:ring-green-500";
    }

    if(hasError && wasTouched){
        return "border-2 border-red-500 ring-transparent focus:border-red-600 focus:ring-2 focus:ring-red-500";
    }

    return "border border-gray-300 ring-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500";
}