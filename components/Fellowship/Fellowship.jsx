import React from "react";
import FellowshipList from "./components/FellowshipGrid";

const FellowshipPage = ({ fellowships }) => {
  // const fellowships = [
  //   {
  //     title: 'Fellowship 1',
  //     image: 'https://opportunitydesk.org/wp-content/uploads/2023/06/Safe-Sisters-Fellowship-Program-2023-for-Women-Human-Rights-Defenders.jpg',
  //     description: 'Description for Fellowship 1.',
  //   },
  //   {
  //     title: 'Fellowship 2',
  //     image: 'https://analyticsbetterworld.org/content/uploads/2023/07/LinkedIn-Event-1.png',
  //     description: 'Description for Fellowship 2.',
  //   },
  //   {
  //     title: 'Fellowship 2',
  //     image: 'https://images.ctfassets.net/gjyjx7gst9lo/2gxSlQgtnAdsvKWh1UUQCW/a1973b7f766b274fb6fbbdfe3ee75b64/Consensys-Fellowship-Program-PR_1920x1080.png?q=75&w=1920',
  //     description: 'Description for Fellowship 2.',
  //   },
  //   {
  //     title: 'Fellowship 2',
  //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRARMkLyorZGauo1icswJflVoFsDmqJW1-oqQ&usqp=CAU',
  //     description: 'Description for Fellowship 2.',
  //   },
  //   {
  //     title: 'Fellowship 2',
  //     image: 'https://s3.amazonaws.com/blog.site/files/fellowship%20opportunities_1624528727.png',
  //     description: 'Description for Fellowship 2.',
  //   },
  //   {
  //     title: 'Fellowship 2',
  //     image: 'https://asef.net/wp-content/uploads/2023/09/spletna-RA.png',
  //     description: 'Description for Fellowship 2.',
  //   },

  // ];

  return (
    <div className=" lg:mx-16">
      <h2 className="text-2xl font-semibold mb-4">Fellowship Programs</h2>
      <FellowshipList fellowships={fellowships} />
    </div>
  );
};

export default FellowshipPage;
