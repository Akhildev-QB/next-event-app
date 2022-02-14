const URL = 'https://my-next-ecom-default-rtdb.firebaseio.com/events.json';

export const getAllEvents = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  const events = [];
  for (const key in data) events.push({ id: key, ...data[key] });
  return events;
};

export const getFeaturedEvents = async () => {
  const events = await getAllEvents();
  return events.filter(({ isFeatured }) => isFeatured);
};

export const getEventById = async (eventId) => {
  const events = await getAllEvents();
  return events.filter(({ id }) => id === eventId)[0];
};

export const getAllIdParams = async () => {
  const events = await getFeaturedEvents();
  return events.map(({ id }) => ({ params: { eventId: id } }));
};

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;
  const events = await getAllEvents();

  return events.filter(({ date }) => {
    const eventDate = new Date(date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
};
