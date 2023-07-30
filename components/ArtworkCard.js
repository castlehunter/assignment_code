import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function Home(props) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);

    if(error){
        return(
            <Error statusCode={404} />
        )     
    } 
    if(data){
        return(
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={data.primaryImageSmall? data.primaryImageSmall:"https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
              <Card.Body>
                  <Card.Title>{data.title? data.title:"N/A"}</Card.Title>
                  <Card.Text>
                     Date: {data.objectDate? data.objectDate:"N/A"} <br/>
                     Classification: {data.classification? data.classification:"N/A"}<br/>
                     Medium: {data.medium? data.medium:"N/A"}
                  </Card.Text>
                  <Link href={`/artwork/${props.objectID}`} passHref><Button variant="outline-primary">ID: {props.objectID}</Button></Link>
              </Card.Body>
          </Card>
        );      
    } else {
        return null;
    }

}