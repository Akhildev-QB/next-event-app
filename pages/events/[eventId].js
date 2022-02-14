import { Fragment } from 'react';
import EventContent from '../../components/eventDetail/EventContent';
import EventSummary from '../../components/eventDetail/EventSummary';
import EventLogistics from '../../components/eventDetail/EventLogistics';
import { getEventById, getAllIdParams } from '../../helpers/utils';

const EventsDetailPage = ({ event }) => {
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const { eventId } = context.params;
  const event = await getEventById(eventId);
  return { props: { event }, revalidate: 60 };
};

export const getStaticPaths = async () => {
  const paths = await getAllIdParams();
  return { paths, fallback: 'blocking' };
};

export default EventsDetailPage;
