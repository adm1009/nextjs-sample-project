import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A first meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/6/6d/Paris_-_Place_de_la_Concorde_-_3119.jpg",
//     address: "1256843 Paris, France",
//     description: "this is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/1/13/Los_Angeles_and_skyline_at_night%2C_California%2C_U.S.jpg",
//     address: "12356 California, US",
//     description: "this is a second meetup!",
//   },
// ];

function HomePage(props) {
  return;
  <Fragment>
    <Head>
      <title>Official Meetings</title>
      <meta name="description" content="Browse a huge list of highly active Official meetings!"/>
    </Head>
    <MeetupList meetups={props.meetups} />;
  </Fragment>;
}

// export async function getServerSideProps (context) {
//    const req = context.req;
//    const res = context.res;

//     return {
//         props : {
//             meetups : DUMMY_MEETUPS
//         }
//     };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://adm1009:GXsvQVzD3I1BuRtw@cluster0.7ah7l.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
