import { Fragment } from 'react';
import { getFilteredEvents } from '../../helpers/utils';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';

const FilteredEventsPage = (props) => {
  const { events } = props;

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter values! Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">No events found for this filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.year, props.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const { slug: filteredData } = context.params;

  const year = Number(filteredData[0]);
  const month = Number(filteredData[1]);

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month > 12 ||
    month < 1
  ) {
    return { hasError: true };
  }

  const events = await getFilteredEvents({ year, month });
  return { props: { events, year, month } };
};

export default FilteredEventsPage;
