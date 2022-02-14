import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { transformData, URL } from '../../helpers/utils';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';
import useSWR from 'swr';

const FilteredEventsPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState();
  const { slug: filteredData } = router.query;

  const { data, error } = useSWR(URL, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) setEvents(transformData(data));
  }, [data]);

  if (!events) return <p className="center">Loading...</p>;

  const year = Number(filteredData[0]);
  const month = Number(filteredData[1]);

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month > 12 ||
    month < 1 ||
    error
  ) {
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

  const filteredEvents = events.filter(({ date }) => {
    const eventDate = new Date(date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
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

  const date = new Date(year, month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
