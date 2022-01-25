import { Fragment } from "react";
import { MongoClient ,ObjectId} from "mongodb";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment >
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description}/>
      </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </Fragment>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://adm1009:GXsvQVzD3I1BuRtw@cluster0.7ah7l.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups =await meetupsCollection.find({}, {_id : 1}).toArray();
  client.close();
    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({params : {meetupId : meetup._id.toString() }}))
        [{
            params :{
            meetupId : 'm1'
            },
        },
        {
            params :{
            meetupId : 'm2'
            },
        }
    ]
    }
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://adm1009:GXsvQVzD3I1BuRtw@cluster0.7ah7l.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({_id : ObjectId(meetupId)})
  client.close();
  // console.log(meetupId);

  return {
    props: {
      meetupData:{
        meetupData : {
         id: selectedMeetup._id.toString(),
         title: selectedMeetup.title,
         address: selectedMeetup.address,
         image: selectedMeetup.image,
         description: selectedMeetup.description,
        },
      }
      //  {
      //   image:"https://upload.wikimedia.org/wikipedia/commons/6/6d/Paris_-_Place_de_la_Concorde_-_3119.jpg"
      //   ,
      //   id : meetupId,
      //   title:"A First Meetup",
      //   address:"12345 Paris, France",
      //   description:"The Meetup Description"
      // },
    },
  };
}

export default MeetupDetails;
