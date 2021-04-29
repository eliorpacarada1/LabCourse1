import { useReducer, useCallback, useEffect, useState } from 'react'
import { useSemiPersistentState, storiesReducer, } from './search/hooks'
import { Map, RedMarker, GreenMarker, YellowMarker } from './map'
import axios from 'axios'
import { Book, SearchForm } from './search'
import { NavBar } from '../../components/Navbars'


const API_ENDPOINT = '/api?city=';

export const Parking = props => {
    const name = props.match.params.temp;

    const [url, setUrl] = useState(`${API_ENDPOINT}${name}`)

    const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '')

    const handleSearchInput = event => {
        setSearchTerm(event.target.value);
    };

    const handeSearchSubmit = (e) => {
        e.preventDefault()
        setUrl(`${API_ENDPOINT}${searchTerm}`)
        console.log(url)
    }

    const [stories, dispatchStories] = useReducer(
        storiesReducer,
        { data: [], isLoading: false, isError: false }
    )

    const handleFetchStories = useCallback(async () => {
        dispatchStories({ type: 'STORIES_FETCH_INIT' })

        try {
            const result = await axios.get(url)
            dispatchStories({
                type: 'STORIES_FETCH_SUCCESS',
                payload: result.data
            })

        } catch {
            dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
        }
    }, [url])

    useEffect(() => {
        handleFetchStories()
    }, [handleFetchStories])

    return (
        <>
            <NavBar />
            <div className='main-search-form'>
                <SearchForm
                    searchTerm={searchTerm}
                    onSearchInput={handleSearchInput}
                    onSearchSubmit={handeSearchSubmit}
                />
            </div>
            <br />
            {stories.isError && <p>Something went wrong...</p>}
            {stories.isLoading ? (<h2 className="loading-main">Loading ...</h2>) : (
                <div className="Include">
                    <div className="App">
                        {stories.data.map((e, key) =>
                            <Book id={e.id} freeSpots={e.free_Spots} section={e.section} name={e.name} key={key} image={e.image} city={e.city} valet={e.valet} price={e.price} slots={e.free_Spots} />
                        )}

                    </div >
                    <div className="Map">
                        <Map>
                            {stories.data.map((e, key) =>
                            (0 <= e.free_Spots && e.free_Spots <= 5 ?
                                <RedMarker freeSpots={e.free_Spots} city={e.city} section={e.section} key={key} latitude={e.latitude} longitude={e.longitude} />
                                : (5 < e.free_Spots && e.free_Spots < 11 ?
                                    <YellowMarker freeSpots={e.free_Spots} city={e.city} section={e.section} key={key} latitude={e.latitude} longitude={e.longitude} />
                                    :
                                    <GreenMarker freeSpots={e.free_Spots} city={e.city} section={e.section} key={key} latitude={e.latitude} longitude={e.longitude} />
                                )
                            ))}
                        </Map>
                    </div>
                </div >
            )}
        </>
    )
}
