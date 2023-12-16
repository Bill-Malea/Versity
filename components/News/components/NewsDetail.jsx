/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
const EventDetails = ({ event }) => {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="lg:mx-40 mx-5 my-5">
        <h2 className="text-3xl font-semibold mb-4">{event.title}</h2>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Event</h2>
          <div dangerouslySetInnerHTML={{ __html: event.content }} />
        </div>
      </div>
    </Link>
  );
};

export default EventDetails;
