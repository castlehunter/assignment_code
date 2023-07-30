import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';
import { addToFavourites } from '@/lib/userData';
import { removeFromFavourites } from '@/lib/userData';

export default function ArtworkCard(props) {
    const { data, error } = useSWR(props.objectID?`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`:null);

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    const [showAdded, setShowAdded] = useState(false);

    useEffect(()=>{
      setShowAdded(favouritesList?.includes(props.objectID))
      }, [favouritesList])


    async function favouritesClicked() {
      if (showAdded) {
        setFavouritesList(await removeFromFavourites(props.objectID))
        setShowAdded(false);
      } else {
        setFavouritesList(await addToFavourites(props.objectID))
        setShowAdded(true);
      }
    }

    if (error) {
        return <Error statusCode={404} />;
      }
    if (data === null || data === undefined) {
        return null;
    }
    return(
        <Card>            
          {data.primaryImage && <Card.Img src={data.primaryImage} />}
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>
                <b>Date:</b> {data.objectDate?data.objectDate:`N/A`} <br />
                <b>Classification:</b> {data.classification?data.classification:`N/A`} <br />
                <b>Medium:</b> {data.medium?data.medium:`N/A`} <br /><br />    
                <b>Artist:</b> {data.artistDisplayName?data.artistDisplayName:`N/A`} {(data.artistWikidata_URL) && (<>( <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a> )</>)}<br />
                <b>Credit Line:</b> {data.creditLine?data.creditLine:`N/A`} <br />
                <b>Dimensions:</b> {data.dimensions?data.dimensions:`N/A`}<br />
                <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>
                    {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                </Button>
            </Card.Text>
          </Card.Body>
        </Card> 
        )
}