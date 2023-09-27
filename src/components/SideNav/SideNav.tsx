import { AiOutlineHome } from 'react-icons/ai';
import { PiListBold } from 'react-icons/pi';
import { BsListCheck } from 'react-icons/bs';
import classes from './SideNav.module.css'; 


export default function SideNav() {
  return (
    <nav className={classes.sideNav}>
      <div >
        <PiListBold className={classes.burgerIcon} size={22} /> 
        <AiOutlineHome size={22} className={classes.homeIcon} />
        <BsListCheck size={22}  />
      </div>
      <div className={classes.userImg}>
        <img  src="public\imgs\Group 26934.png" alt="" />
      </div>
    </nav>
  )
}
