import { getFeaturedEvents } from '../helpers/utils';
import EventList from '../components/events/EventList';

const HomePage = (props) => {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const events = await getFeaturedEvents();
  return { props: { events }, revalidate: 3600 };
};

export default HomePage;
