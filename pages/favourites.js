import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Card , Row, Col} from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";


export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;
    if (favouritesList != null && favouritesList != undefined) {
     return (<>
       <br />
       {(favouritesList) && (<Row className="gy-4">
                           {(favouritesList.length > 0) && (favouritesList.map(artwork =>
                                          <Col lg={3} key={artwork}><ArtworkCard objectID={artwork} /></Col> ))}
                           {(favouritesList.length === 0) && (<Card><Card.Body><h4>Nothing Here</h4></Card.Body></Card>)}
                            </Row> 
       )}
      <br />
    </>)
    } else {
        return null;
    }
}