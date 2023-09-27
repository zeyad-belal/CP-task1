import classes from './Nav.module.css'; 

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        <li>Program Details</li>
        <li className={classes.active}>Application Form</li>
        <li>Workflow</li>
        <li>Preview</li>
      </ul>
    </nav>
  )
}
