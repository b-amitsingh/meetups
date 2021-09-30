import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse list of React meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const url =
    "mongodb+srv://new-user:VlnpYQ7kJJeAydyj@cluster0.tfdsy.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(url);

  await client.connect();
  console.log("Connected correctly to server");
  const db = client.db("test");

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  await client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
