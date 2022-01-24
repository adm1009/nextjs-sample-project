import classes from './MainNavigation.module.css';
import Link from 'next/Link';
function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Official Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Total Meetings</Link>
          </li>
          <li>
            <Link href='/new-meetup'>New Meeting Add</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
