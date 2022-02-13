import Button from '../ui/Button';
import classes from './EventItem.module.css';
import DateIcon from '../icons/DateIcon';
import AddressIcon from '../icons/AddressIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';

const EventItem = (props) => {
  const { title, image, date, location, id } = props;
  const eventDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const eventAddress = location.replace(',', '\n');
  const eventLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={'/' + image} alt={image} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{eventDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{eventAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={eventLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
