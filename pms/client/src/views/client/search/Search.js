import { useEffect, useRef } from 'react'
import { Button, TextField } from '@material-ui/core'

export const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
}) => (
    <form className="search-form">
        <InputWithLabel
            id="search"
            value={searchTerm}
            isFocused
            onInputChange={onSearchInput}
        >
            <strong>Search:</strong>
        </InputWithLabel>

        <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!searchTerm}
            className="button button-large"
            onClick={onSearchSubmit}>
            Submit
      </Button>
    </form>
);

const InputWithLabel = ({
    id,
    value,
    type = 'text',
    onInputChange,
    isFocused,
    children,
}) => {
    const inputRef = useRef()

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus()
        }
    }, [isFocused])

    return (
        <>
            <TextField
                label="Search"
                ref={inputRef}
                id={id}
                type={type}
                value={value}
                onChange={onInputChange}
                className="input"
            />
        </>
    )
}