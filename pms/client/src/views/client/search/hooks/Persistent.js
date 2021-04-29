import { useState, useEffect } from 'react'

export const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = useState("")

    useEffect(() => {
        localStorage.setItem(key, value)
    }, [value, key])

    return [value, setValue]
}